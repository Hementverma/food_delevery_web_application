import React from 'react'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { removeCartItem, updateQuantity } from '../redux/userSlice';
function CartItemCard({data}) {
    const dispatch=useDispatch()
    const handleIncrease=(id,currentQty)=>{
       dispatch(updateQuantity({id,quantity:currentQty+1}))
    }
      const handleDecrease=(id,currentQty)=>{
        if(currentQty>1){
  dispatch(updateQuantity({id,quantity:currentQty-1}))
        }
        
    }
  return (
    <div className='flex items-center justify-between bg-white p-4 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300'>
      <div className='flex items-center gap-4'>
        <div className='w-20 h-20 rounded-xl overflow-hidden shadow-sm'>
          <img src={data.image} alt="" className='w-full h-full object-cover'/>
        </div>
        <div>
            <h1 className='font-bold text-gray-800 text-sm'>{data.name}</h1>
            <p className='text-xs text-gray-400 mt-0.5'>₹{data.price} x {data.quantity}</p>
            <p className="font-black text-[#ff4d2d] text-sm mt-1">₹{data.price*data.quantity}</p>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <button className='w-8 h-8 cursor-pointer bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-100' onClick={()=>handleDecrease(data.id,data.quantity)}>
          <FaMinus size={10} className='text-gray-600'/>
        </button>
        <span className='text-sm font-bold text-gray-800 w-6 text-center'>{data.quantity}</span>
        <button className='w-8 h-8 cursor-pointer bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors border border-gray-100' onClick={()=>handleIncrease(data.id,data.quantity)}>
          <FaPlus size={10} className='text-gray-600'/>
        </button>
        <button className="w-8 h-8 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 flex items-center justify-center transition-colors ml-1 border border-red-100"
          onClick={()=>dispatch(removeCartItem(data.id))}>
          <CiTrash size={16}/>
        </button>
      </div>
    </div>
  )
}

export default CartItemCard
