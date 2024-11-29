import { prisma } from '@/lib/client'
import { type commentTypeAPI } from '@/types/api'
import { HTTP } from '@/types/magicNumbers'
import { type NextRequest } from 'next/server'

export async function POST (req: NextRequest) {
  const reqResult: commentTypeAPI = await req.json()
  const length = await prisma.aVALIACAO_PEDIDO.findMany()
  const resultDB = await prisma.aVALIACAO_PEDIDO.create({
    data: {
      COD_AVALIACAO_PEDIDO: length.length + 1,
      COD_CLIENTE: 2,
      NUM_NOTA_AVALIACAO: reqResult.star,
      TXT_AVALIACAO: reqResult.comment,
      COD_PEDIDO: reqResult.productId
    }
  })
  console.log(resultDB)
  return new Response('A avaliação foi cadastrada com sucesso!',
    {
      status: HTTP.OK
    }

  )
}

export async function GET (req: NextRequest) {
  console.log(req)
  // prisma.comments.create({
  //   data: {
  //     name: req.body.name,
  //     productId:,
  //     star:,
  //     comment:
  //   }
  // })
  return new Response('A avaliação foi cadastrada com sucesso!',
    {
      status: HTTP.OK
    }

  )
}
