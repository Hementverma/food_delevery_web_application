import React from 'react'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import OwnerItemCard from './OwnerItemCard';
import { FiArrowRight, FiMapPin } from "react-icons/fi";
function OwnerDashboard() {
  const { myShopData } = useSelector(state => state.owner)
  const navigate = useNavigate()

  
  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center'>
      <Nav />
      {!myShopData &&
        <div className='flex justify-center items-center p-6 mt-24'>
          <div className='w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-gray-100 text-center animate-scale-in'>
            <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] flex items-center justify-center mx-auto mb-5 shadow-xl shadow-[#ff4d2d]/20'>
              <FaUtensils className='text-white text-3xl' />
            </div>
            <h2 className='text-2xl font-black text-gray-800 mb-2 tracking-tight'>Add Your Restaurant</h2>
            <p className='text-gray-500 mb-6 text-sm leading-relaxed'>Join our food delivery platform and reach thousands of hungry customers every day.</p>
            <button className='flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl transition-all cursor-pointer mx-auto' onClick={() => navigate("/create-edit-shop")}>
              <span>Get Started</span>
              <FiArrowRight size={18}/>
            </button>
          </div>
        </div>
      }

      {myShopData &&
        <div className='w-full flex flex-col items-center gap-6 px-5 mt-24 mb-10 max-w-3xl mx-auto'>
          <h1 className='text-2xl sm:text-3xl text-gray-800 font-black tracking-tight text-center'>
            Welcome to <span className='text-gradient'>{myShopData.name}</span>
          </h1>

          <div className='bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 w-full relative card-hover'>
            <div className='absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-[#ff4d2d] p-2.5 rounded-xl shadow-lg hover:bg-[#ff4d2d] hover:text-white transition-all cursor-pointer' onClick={()=>navigate("/create-edit-shop")}>
              <FaPen size={16}/>
            </div>
             <div className='h-48 sm:h-64 overflow-hidden'>
               <img src={myShopData.image} alt={myShopData.name} className='w-full h-full object-cover hover:scale-105 transition-transform duration-700'/>
             </div>
             <div className='p-5 sm:p-6'>
               <h1 className='text-xl sm:text-2xl font-black text-gray-800 mb-2'>{myShopData.name}</h1>
               <div className='flex items-center gap-2 text-gray-500 text-sm'>
                 <FiMapPin size={14} className='text-[#ff4d2d]'/>
                 <span>{myShopData.city}, {myShopData.state}</span>
               </div>
               <p className='text-gray-400 text-sm mt-1'>{myShopData.address}</p>
             </div>
          </div>

          {myShopData.items.length==0 && 
            <div className='w-full bg-white shadow-xl rounded-3xl p-8 border border-gray-100 text-center'>
              <div className='w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mx-auto mb-4'>
                <FaUtensils className='text-[#ff4d2d] text-2xl' />
              </div>
              <h2 className='text-xl font-black text-gray-800 mb-2'>Add Your Food Item</h2>
              <p className='text-gray-500 mb-5 text-sm'>Share your delicious creations with customers.</p>
              <button className='flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl transition-all cursor-pointer mx-auto' onClick={() => navigate("/add-item")}>
                <span>Add Food</span>
                <FiArrowRight size={18}/>
              </button>
            </div>
          }

          {myShopData.items.length>0 && 
            <div className='flex flex-col items-center gap-4 w-full'>
              {myShopData.items.map((item,index)=>(
                <OwnerItemCard data={item} key={index}/>
              ))}
            </div>
          }
        </div>
      }
    </div>
  )
}

export default OwnerDashboard
