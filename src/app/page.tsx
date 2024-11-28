'use client'
import { commentValidation, type commentType } from '@/validations/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as Container from './components/containers'
import instance from './lib/axios'

export default function Home () {
  const { watch, register, handleSubmit, formState: { errors, isSubmitting } } = useForm<commentType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(commentValidation),
    defaultValues: {
      name: '',
      comment: '',
      star: 0
    }
  })

  const valueStar = watch('star')

  async function handleForm (data: commentType) {
    const result = await instance.post('comments',
      {
        name: data.name,
        comment: data.comment,
        star: data.star
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    console.log(result)
  }
  console.log(errors)

  return (
    <section className="w-screen min-h-screen overflow-hidden flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(handleForm)} className="w-mobileForm md:w-webForm flex flex-col justify-center items-center gap-4">
        <Container.Label htmlFor="name">
          <p>Nome</p>
          <input aria-invalid={!!errors.name?.message}
          className='px-1 w-full border-2 rounded-md aria-[invalid=true]:border-red-600 focus:outline-none' id='name' type="text" {...register('name')} />
          {!!errors.name?.message && <span>{errors.name.message}</span>}
        </Container.Label>

        <Container.Label htmlFor="comment">
          <p>Comentário de Avaliação</p>
          <textarea id='comment' aria-invalid={!!errors.comment?.message} spellCheck rows={6}
          className='px-1 w-full border-2 rounded-md aria-[invalid=true]:border-red-600 focus:outline-none resize-none' {...register('comment')} />
          {!!errors.comment?.message && <span>{errors.comment.message}</span>}
        </Container.Label>

        <Container.Label htmlFor="star">
          <p>Nota de Avalicação</p>
          <p>{valueStar}</p>
          <input id='star' type="range" min={0} max={5} step={0.1} className='max-w-xs w-full'
          {...register('star', { valueAsNumber: true })} />
          {!!errors.star?.message && <span>{errors.star.message}</span>}
        </Container.Label>

        <button type="submit" >Enviar Avaliação</button>
      </form>
    </section>
  )
}
