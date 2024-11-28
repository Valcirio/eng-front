import { prisma } from '@/app/lib/client'
import { type commentTypeAPI } from '@/app/types/api'
import { HTTP } from '@/app/types/magicNumbers'
import { type NextRequest } from 'next/server'

export async function POST (req: NextRequest) {
  const reqResult: commentTypeAPI = await req.json()

  const resultDB = await prisma.comments.create({
    data: {
      name: reqResult.name,
      comment: reqResult.comment,
      star: reqResult.star,
      productId: reqResult.productId
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
