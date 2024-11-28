'use client'
import { commentValidation, type commentType } from '@/validations/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import instance from './lib/axios'
import { Label, StarRating } from './components/containers'

export default function Home () {
  const { watch, register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<commentType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(commentValidation),
    defaultValues: {
      name: '',
      comment: '',
      star: 5
    }
  })

  const valueStar = watch('star')

  async function handleForm (data: commentType) {
    const result = await instance.post('comments',
      {
        name: data.name,
        comment: data.comment,
        star: data.star
      })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(handleForm)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-indigo-500">Deixe seu Comentário</h2>

        <Label htmlFor="name" className="block mb-4">
          <span className="text-gray-700 text-base font-medium">Nome</span>
          <input
            id="name"
            type="text"
            className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black`}
            {...register('name')}
          />
          {!!errors.name?.message && <span className="text-red-600">{errors.name.message}</span>}
        </Label>

        <Label htmlFor="comment" className="block mb-4">
          <span className="text-gray-700 text-base font-medium">Comentário de Avaliação</span>
          <textarea
            id="comment"
            aria-invalid={!!errors.comment?.message}
            spellCheck
            rows={6}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.comment ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none text-black`}
            {...register('comment')}
          />
          {!!errors.comment?.message && <span className="text-red-600">{errors.comment.message}</span>}
        </Label>

        <Label htmlFor="star" className="block mb-4">
          <span className="text-gray-700 text-base font-medium">Nota de Avaliação</span>
          <StarRating
            value={valueStar}
            onChange={(rating) => setValue('star', rating)}
          />
          {!!errors.star?.message && <span className="text-red-600">{errors.star.message}</span>}
        </Label>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          disabled={isSubmitting}
        >
          Enviar Avaliação
        </button>
      </form>
    </div>
  )
}