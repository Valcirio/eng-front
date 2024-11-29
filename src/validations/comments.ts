import { z } from 'zod'

export const commentValidation = z.object({
  comment: z.string().nonempty('Campo obrigatório')
    .min(50, 'A avaliação tem que ter no mínimo 50 caracteres')
    .max(300, 'A avaliação tem que ter no máximo 300 caracteres'),
  star: z.number().nonnegative('Não aceita valores negativos')
    .max(5, 'Não pode dar mais do que cinco estrelas'),
  productId: z.number().positive('É preciso escolher um pedido')
})

export type commentType = z.infer<typeof commentValidation>
