import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";
function OrderPlaced() {
    const navigate=useNavigate()
  return (
    <div className='min-h-screen bg-[#fff9f6] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute top-[20%] left-[10%] w-[200px] h-[200px] rounded-full bg-green-500/5 blur-3xl animate-float'></div>
      <div className='absolute bottom-[20%] right-[10%] w-[200px] h-[200px] rounded-full bg-[#ff4d2d]/5 blur-3xl animate-float' style={{animationDelay:'1s'}}></div>

      <div className='relative z-10 bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-100 animate-scale-in'>
        <div className='w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30 animate-pulseGlow'>
          <FaCircleCheck className='text-white text-4xl'/>
        </div>
        <h1 className='text-3xl font-black text-gray-800 mb-3 tracking-tight'>Order Placed!</h1>
        <p className='text-gray-500 max-w-xs mx-auto text-sm leading-relaxed'>Thank you for your purchase. Your order is being prepared. Track it in "My Orders".</p>
        <button className='mt-8 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl transition-all cursor-pointer' onClick={()=>navigate("/my-orders")}>
          <span>View My Orders</span>
          <FiArrowRight size={18}/>
        </button>
      </div>
    </div>
  )
}

export default OrderPlaced
