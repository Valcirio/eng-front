import { prisma } from '@/app/lib/client'
import { HTTP } from '@/app/types/magicNumbers'
import { NextApiResponse } from 'next'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST (req: NextRequest) {
  const reqResult: { nome: string } = await req.json()
  console.log(reqResult)
  const resultDB = await prisma.products.create({
    data: {
      title: reqResult.nome
    }
  })
  console.log(resultDB)
  return new Response('Produto cadastrado com sucesso!',
    {
      status: HTTP.OK
    })
}

export async function GET (req: NextRequest) {
  const resultDB = await prisma.products.findMany()

  if (!resultDB) {
    return new Response('Não foi possivel achar os produtos',
      {
        status: HTTP.NotFound
      })
  }

  return Response.json({ status: HTTP.OK, data: resultDB })
}
