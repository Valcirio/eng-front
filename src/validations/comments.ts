import { z } from 'zod'

export const commentValidation = z.object({
  name: z.string().nonempty('Campo obrigatório'),
  comment: z.string().nonempty('Campo obrigatório')
    .min(50, 'A avaliação tem que ter no mínimo 50 caracteres').max(300, 'A avaliação tem que ter no máximo 300 caracteres'),
  star: z.number().nonnegative('Não aceita valores negatives').max(5, 'Não pode dar mais do que cinco estrelas')
})

export type commentType = z.infer<typeof commentValidation>
