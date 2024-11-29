import { type commentType } from '@/validations/comments'

export type commentTypeAPI = commentType & {
  productId: string
}

export type productTypeAPI = {
  id: string
  title: string
}
