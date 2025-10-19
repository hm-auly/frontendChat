import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navber() {
  const [activ1, setActiv1] = useState(true)
  const [activ2, setActiv2] = useState(false)
  const [activ3, setActiv3] = useState(false)
  const [activ4, setActiv4] = useState(false)
  const ActivLink1 = ()=>{
    setActiv1(true)
    setActiv2(false)
    setActiv3(false)
    setActiv4(false)
  }
  const ActivLink2 = ()=>{
    setActiv2(true)
    setActiv1(false)
    setActiv3(false)
    setActiv4(false)

  }
  const ActivLink3 = ()=>{
    setActiv3(true)
    setActiv1(false)
    setActiv2(false)
    setActiv4(false)
  }
  const ActivLink4 = ()=>{
    // setActiv4(true)
    // setActiv1(false)
    // setActiv2(false)
    // setActiv3(false)
  }
  const NabInfo = [
    {
      navT: "Home",
      navL: "Home"
    },
    {
      navT: "About",
      navL: "About",
    },
    {
      navT: "Contact",
      navL: "Contact"
    },
    {
      navT: "Message",
      navL: "Contact"
    },
  ]
  return (
   <section className=''>
     <section className='  md:shadow-custom P-0  duration-300 md:h-[60px] flex flex-col justify-center md:my-5 md:rounded-full backdrop-blur-md py-5 md:py-10 bg-transparent shadow-2xl '>

<div className='bg-[bdbdc3] flex justify-between flex-col md:flex-row md:px-5 md:pr-8 items-center '>
 
 <div className='flex justify-between items-center pb-5 md:pb-0 w-full md:w-[50%]'>

   <div className='flex items-center gap-3'>
   <div>
      <img className='h-11 md:h-[55px]   rounded-full bg-contain' src="/logo2.jpg" alt="" />
    </div>
    <h1 className='text-lg md:text-2xl font-bold'>MyPortfolio</h1>
   </div>
   <div>
   </div>
  </div>
 
  <div className='flex pt-4  md:gap-16 justify-between md:justify-end items-center w-full '>
    <div className={`NavLinkStyle hover:bg-amber-600 `} >
      <i className="fa-solid fa-house text-xl  "></i>
      <Link to="/" >Home</Link>
    </div>
    <div className={`NavLinkStyle `} >
      <i class="fa-solid fa-user text-xl "></i>
      <a href="no">About</a>
    </div>
    <div className={`NavLinkStyle `}>
    <i class="fa-solid fa-phone-volume text-xl"></i>
    <Link to="/Conact" >Contact</Link>
    </div>
    <div className={`NavLinkStyle `}>
      <i class="fa-brands fa-facebook-messenger text-xl"></i>
      <Link  to="/Dashboard " >Message</Link>
    </div>
  </div>
  </div>
{/* </div> */}
</section>
   </section>
  )
}

export default Navber;