import Image from 'next/image';
import DateCountdown from './DateCountDown';
 
export default function Offer() {

  return (
    <div className='  flex flex-col md:flex-row gap-4 bg-[url("/offerBg.png")] text-white'>
        <div className='flex-1 flex flex-col justify-center items-center p-6  gap-5  '>
            <h1 className='text-6xl text-center text-bold p-4 uppercase  '>
                Delicious Burger & Fries
            </h1>
            <p className='text-md text-center p-4 uppercase '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis recusandae velit sunt ipsa alias molestiae perferendis a veritatis pariatur explicabo.  
            </p>
            <div className='text-4xl text-yellow-300'>
                <DateCountdown targetDate={new Date('2024-1-21')}/>
            </div>
           
        </div>
        {/* <div className='flex-1 w-full relative  md:w-1/2'> */}
        <div className='flex-1 md:w-1/2 '>
        <Image
          src='/offerProduct.png'
          alt='img'
          layout="responsive" width={400} height={400} objectFit='cover-contain'
        />
        </div>
    </div>
  );
}


 

