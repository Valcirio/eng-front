import { type commentType } from '@/validations/comments'

export type commentTypeAPI = commentType & {
  productId: string
}
