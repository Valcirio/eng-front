import { z } from 'zod'

export const productValidation = z.object({
  title: z.string().nonempty('Campo obrigatório'),
  price: z.number().nonnegative('Não aceita valores negatives')
})

export type productType = z.infer<typeof productValidation>
