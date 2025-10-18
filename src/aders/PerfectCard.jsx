import React from 'react'

function PerfectCard() {
  return (
    <>
        <section className='flex items-center px-5 md:px-24 py-20 flex-col md:flex-row '>
            <div className='md:w-1/2 w-full '>
                <img className='text-center w-full md:w-[90%]  ' src="/Images/Group 16.svg" alt="" />
            </div>

            <div className='md:w-1/2 w-full mt-10 md:mt-0'>
                <h1 className='text-3xl md:text-4xl font-bold text-center md:text-start'>Find the Perfect Card for You</h1>
                <p className='text-sm md:max-w-lg py-7 text-center md:text-start'>Unlocking the Power of Crypto, Both Virtually and Physically
                Manage your crypto effortlessly and spend it seamlessly with Wern. Our virtual card allows for instant and secure online transactions, while the physical Wern Card empowers you to convert and spend your crypto at millions of merchants worldwide. Experience the flexibility and convenience of both options, all within the secure and user-friendly Wern ecosystem.</p>
               <div className='text-center md:text-start flex justify-center items-center md:justify-start'>
                 <button radius="full" className='btn bg-[#772AB3] text-white'>Learn</button>
               </div>
            </div>
       
        </section>
    </>
  )
}

export default PerfectCard;