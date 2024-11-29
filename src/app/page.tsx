import FormComment from '@/components/form'
import instance from '@/lib/axios'
import { Toaster } from 'react-hot-toast'

export default async function Home () {
  try {
    const { data }: any = await instance.get('products')
    console.log(data.data)
    return (
      <section className="w-screen min-h-screen overflow-hidden flex flex-col justify-center items-center bg-background">
      <Toaster />
      <FormComment data={data.data} />
    </section>
    )
  } catch (err) {

  }
}
