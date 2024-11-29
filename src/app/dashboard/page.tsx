import FormDash from './components/formDash'
import axios from 'axios'

export default async function Dashboard () {
  try {
    const { data }: any = await axios.get('http://127.0.0.1:5000/api/analyzeSentiment')
    return (
      <section className="w-screen min-h-screen overflow-hidden flex flex-col justify-center items-center bg-background">
      <FormDash data={data} />
    </section>
    )
  } catch (err) {

  }
}
