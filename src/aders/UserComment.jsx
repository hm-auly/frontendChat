import React from 'react'

function UserComment() {
    const UsereRevio = [
                {
                    image: "/Images/Frame.svg",
                    des: "Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings. ",
                    profileImg: "/Images/Auly.jpg",
                    userName: "Auly ullah",
                    unicname: "AK Auly"
                },
                {
                    image: "/Images/Frame.svg",
                    des: "Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings. ",
                    profileImg: "/Images/Auly.jpg",
                    userName: "Auly ullah",
                    unicname: "AK Auly"
                },
                {
                    image: "/Images/Frame.svg",
                    des: "Great session! Dani was super helpful. She shared some practical advice on how can lorem ip we go about refining our service offerings. ",
                    profileImg: "/Images/Auly.jpg",
                    userName: "Auly ullah",
                    unicname: "AK Auly"
                }
            ]
  return (
     <>
       <section className='md:px-24 px-5 py-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10  '>
               {UsereRevio.map((info, index) => (
                    <div key={index} className='bg-[#27322F3D] p-5 rounded-xl backdrop-blur-sm hover:bg-[#1c26233d] transition-all duration-300 shadow-sm'>
                       <div >
                          <img src={info.image} alt="" />
                       </div>
                       <div>
                          <p className='max-w-lg py-10 text-[15px]'>{info.des}</p>
                       </div>
                       <div className='flex gap-5 items-center '>
                          <div >
                            <img className='w-10 h-auto bg-cover rounded-full ' src={info.profileImg} alt="" />
                          </div>
                          <div>
                             <h3 className='font-semibold'>{info.userName}</h3>
                             <p className='text-sm text-secondary'>{info.unicname}</p>
                          </div>
                       </div>
                    </div>
                ))}
          </div>
       </section>
     </>
  )
}

export default UserComment