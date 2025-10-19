import React from 'react';
import { Link } from 'react-router-dom';
import Hiro from './Hiro';
import Vision from './Vision';
import Offer from './Offer';
import DebitCard from './DebitCard';
import PerfectCard from './PerfectCard';
import UserComment from './UserComment';
import IIiit from './IIiit';
import Navber from './Navber';
import { IoStar } from "react-icons/io5";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function HomePage() {
  return (


    <div  >
      
      {/* <div className='px-5 fixed  w-full  z-50 '> */}
      <div className='px-5 w-full fixed md:relative  z-50'>
        <Navber />
      </div>
      {/* </div> */}
      <div className=' md:pt-0'>
      <Hiro />
       <Vision />
       <Offer />
       <DebitCard />
       <PerfectCard />
       <UserComment />
       <IIiit />
      </div>
   

      <div className='flex justify-center items-center'>
        <div className='h-72 w-72  rounded-full bg-cyan-500 relative ani '>
       
          <div className='absolute rounded-full top-0 w-72 h-64 bg-gray-900 z-40 '>
          <div className=' absolute  top-[20%] left-[50%] transorm -translate-x-1/2 translate-y-1/2'>
         
           <Link to="/admin-login" > <IoStar className='text-8xl' /></Link>
              </div>
          </div>
        </div>
      </div>


       

    </div>






  );
}

export default HomePage;