'use client'

import { type dataAvalProps } from '@/types/fetch'

type formDashProps = {
  data: dataAvalProps[]
}

export default function FormDash ({ data }: formDashProps) {
  console.log(data)
  return (
    <article className="p-6 w-full max-w-lg rounded-lg shadow-md bg-white">
      <h2 className="text-2xl self-start font-bold mb-4 text-primary">Resultados das Avaliações</h2>
      <section className='flex flex-col justify-start items-center gap-4'>
        {
          data.map((el: dataAvalProps, index: number) => {
            return (
              <div key={index} className='pb-1 flex flex-col justify-start items-stretch gap-2 border-b'>
                <p>Comentário: {el.TXT_AVALIACAO}</p>
                <div className='flex flex-row justify-between items-center'>
                  <p>Confiança: {Math.round(el.confidence * 100)}%</p>
                  <p>Nível da avaliação: {el.sentiment.slice(0, 1)}</p>
                </div>
            </div>
            )
          })
        }
      </section>
    </article>
  )
}
