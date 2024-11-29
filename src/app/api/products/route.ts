import { prisma } from '@/lib/client'
import { HTTP } from '@/types/magicNumbers'
import { NextApiResponse } from 'next'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST (req: NextRequest) {
  const reqResult = await req.json()

  const resultDB = await prisma.$queryRaw`SELECT DCR_PRODUTO, it.QTD_PRODUTO, VLR_TOTAL 
  FROM IFOODSOCIAL.ITEM_PEDIDO it
  JOIN IFOODSOCIAL.PRODUTO pd
  WHERE COD_PEDIDO=${reqResult.cod} AND it.COD_PRODUTO=pd.COD_PRODUTO;`

  if (!resultDB) {
    return new Response('Não foi possivel achar os produtos',
      {
        status: HTTP.NotFound
      })
  }

  return Response.json({ status: HTTP.OK, data: resultDB })
}

export async function GET (req: NextRequest) {
  const resultDB = await prisma.pEDIDO.findMany({
    where: {
      COD_CLIENTE: 2
    }
  })

  if (!resultDB) {
    return new Response('Não foi possivel achar os produtos',
      {
        status: HTTP.NotFound
      })
  }

  return Response.json({ status: HTTP.OK, data: resultDB })
}
