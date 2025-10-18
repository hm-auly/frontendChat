import React from 'react'

function Offer() {
    const Icons = [
        {
            Imge: "/Icons/Group 1.svg",
            Heading: "Cardano Debit-Cards",
            Des: "Cardano, simplified. The debit card that makes crypto spending easy."
        },
        {
            Imge: "/Icons/Group 23.svg",
            Heading: "On & Off Ramps",
            Des: "Fiat meets crypto, effortlessly buy, sell, and manage."
        },
        {
            Imge: "/Icons/analytics.png",
            Heading: "Solutions for business",
            Des: "Empowering businesses with effortless crypto payments and seamless fiat solutions."
        }
    ];



  return (
    <>
        <section className='md:px-24 px-5 py-14'>
        <h1 className='text-3xl lg:text-4xl text-center py-12'>What do we offer?</h1>
            <div className='flex gap-10 flex-col md:flex-row'>
               {Icons.map((Prev, i) => ( 
                <div key={i} className='flex gap-5'>
                    <div className='bg-[#3D3F54] hover:bg-gray-800 p-3 h-[52px] flex items-center  rounded-full'>
                       <img className='w-10' src={Prev.Imge} alt="" />
                    </div>
                    <div>
                        <h2 className='text-xl font-bold'>P{Prev.Heading}</h2>
                        <p className='text-sm max-w-sm mt-3 text-gray-300'>{Prev.Des}</p>
                    </div>
                </div>
               ))}
            </div>
        </section>
    </>
  )
}

export default Offer;