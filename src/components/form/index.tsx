'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import instance from '@/lib/axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
// Hooks
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
// Components
import * as Container from '@/components/containers'
import StarRating from '../starRating'
// Tipes
import { commentValidation, type commentType } from '@/validations/comments'
import { HTTP } from '@/types/magicNumbers'
import { type dataProductProps, type dataItemsProps } from '@/types/fetch'

type formCommentProps = {
  data: dataProductProps[]
}

export default function FormComment ({ data }: formCommentProps) {
  const router = useRouter()
  const { watch, register, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm<commentType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(commentValidation),
    defaultValues: {
      comment: '',
      star: 0,
      productId: 0
    }
  })

  const [items, setItems] = useState<dataItemsProps[] | null>(null)

  const valueProduct = watch('productId')
  const valueStar = watch('star')

  useEffect(() => {
    async function getDataItems () {
      const result: any = await instance.post('products', {
        cod: valueProduct
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setItems(result.data.data)
    }
    if (valueProduct === 0) {
      setItems(null)
    } else {
      void getDataItems()
    }
  }, [valueProduct])

  async function handleForm (data: commentType) {
    try {
      const result = await instance.post('comments',
        {
          comment: data.comment,
          star: data.star,
          productId: data.productId
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })

      if (result.status === HTTP.OK) {
        toast.success('Avaliação enviada com sucesso!')
        setTimeout(() => {
          router.refresh()
        }, 500)
      }
    } catch (err) {
      toast.error('Falha ao enviar a avaliação!')
    }
  }
  console.log(errors)
  console.log(items)

  return (
      <form onSubmit={handleSubmit(handleForm)} className="p-6 w-full max-w-lg rounded-lg shadow-md bg-white"
      >
        <h2 className="text-2xl self-start font-bold mb-4 text-primary">Deixe seu Comentário</h2>

        <Container.Label htmlFor="select" className="block mb-4">
          <p className='text-foreground text-base font-medium'>Selecione o Produto</p>
          <select aria-invalid={!!errors.productId?.message}
          className='px-3 py-2 w-full h-9 bg-white border rounded-md sm:text-sm text-black shadow-sm
           aria-[invalid=true]:border-danger border-border
           focus:outline-none focus:ring-primary focus:border-primary'
           id='select' {...register('productId', { valueAsNumber: true })}
           >
             <option value={0}>Selecione um pedido</option>
            {
                data.map((el: dataProductProps, index: number) => {
                  return (
                        <option key={index} value={el.COD_PEDIDO}>
                          Pedido {el.TIP_PEDIDO}, data: {new Date(el.DATA_PEDIDO).toLocaleDateString()}, valor: R$ {el.VLR_PEDIDO}
                        </option>
                  )
                })
            }
           </select>
          {!!errors.productId?.message && <span className='text-danger'>{errors.productId.message}</span>}
          {!!items &&
          <article className='mt-4 p-3 w-full border rounded-lg bg-primary/10'>
            {
              items.map((el: dataItemsProps, index) => {
                return (
                  <Container.Items key={index} >
                    <span className="basis-1/4">{el.DCR_PRODUTO}</span>
                    <p className="basis-1/4">{el.QTD_PRODUTO}x</p>
                    <p className="basis-1/4">valor: R$ {el.VLR_TOTAL}</p>
                  </Container.Items>
                )
              })
            }
          </article>}

        </Container.Label>

        <Container.Label htmlFor="comment" className="block mb-4">
        <p className='text-foreground text-base font-medium'>Comentário de Avaliação</p>
          <textarea id='comment' aria-invalid={!!errors.comment?.message} spellCheck rows={6}
          className='px-3 py-2 w-full bg-white border rounded-md sm:text-sm text-black shadow-sm
          aria-[invalid=true]:border-danger border-border
          focus:outline-none focus:ring-primary focus:border-primary resize-none'
          {...register('comment')}
          />
          {!!errors.comment?.message && <span className='text-danger'>{errors.comment.message}</span>}
        </Container.Label>

        <Container.Label htmlFor="star" className="block mb-4">
        <span className="text-foreground text-base font-medium">Nota de Avaliação</span>
          <StarRating
            value={valueStar}
            onChange={(rating) => { setValue('star', rating) }}
          />
          {!!errors.star?.message && <span className="text-danger">{errors.star.message}</span>}
        </Container.Label>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4"
          disabled={isSubmitting}
        >
          Enviar Avaliação
        </button>
      </form>
  )
}
