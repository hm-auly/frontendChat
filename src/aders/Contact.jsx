import React from 'react'
import Navber from './Navber'

function Contact() {
  return (
    <div className='h-screen '>
        <div className='px-5'>
            <Navber />
        </div>
        <div>
            <div className='flex justify-center items-center h-screen pb-28'>

              <div className=''>
              <a href="">
                <button onClick={() => window.open('https://meet.google.com/zvx-wvht-anj', '_blank')}
                  className='flex gap-5 justify-center bg-cyan-500 px-7 py-3 rounded-full outline font-bold' >
                <i class="fa-solid fa-phone-volume text-3xl"></i> <span className='text-2xl'>Join Now</span>
                </button>
              </a>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Contact