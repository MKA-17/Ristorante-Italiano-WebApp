import FeaturedItems from '@/components/Home/FeaturedItems'
import Offer from '@/components/Home/Offer'
import Slider from '@/components/Home/Slider'
import Image from 'next/image'
import { getAuthSession } from './api/auth/[...nextauth]/options'

export const metadata = {
  title: 'Home',
  description: 'Welcome to Ristorante Italiano',
}

export default async function Home() {
  // console.log(await getAuthSession())
  return (
    <div className=''>
       {/* slider */}
       <Slider/>
      {/*Items  */}
       <FeaturedItems/>
      {/* Offer */}
       <Offer/>
    </div>
  )
}
