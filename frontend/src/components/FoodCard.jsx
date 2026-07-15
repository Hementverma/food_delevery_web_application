import React, { useState } from 'react'
import { FaLeaf } from "react-icons/fa";
import { FaDrumstickBite } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/userSlice';

function FoodCard({data}) {
const [quantity,setQuantity]=useState(0)
const dispatch=useDispatch()
const {cartItems}=useSelector(state=>state.user)
    const renderStars=(rating)=>{
        const stars=[];
        for (let i = 1; i <= 5; i++) {
           stars.push(
            (i<=rating)?(
                <FaStar className='text-amber-400 text-xs'/>
            ):(
                <FaRegStar className='text-amber-400 text-xs'/>
            )
           )
            
        }
return stars
    }

const handleIncrease=()=>{
    const newQty=quantity+1
    setQuantity(newQty)
}
const handleDecrease=()=>{
    if(quantity>0){
const newQty=quantity-1
    setQuantity(newQty)
    }
    
}

  return (
    <div className='w-[250px] rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col card-hover border border-gray-100'>
      <div className='relative w-full h-[170px] flex justify-center items-center overflow-hidden'>
        <div className='absolute top-3 left-3 z-10'>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
            data.foodType=="veg" 
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
              : 'bg-red-50 text-red-500 border border-red-200'
          }`}>
            {data.foodType=="veg" ? <FaLeaf size={10}/> : <FaDrumstickBite size={10}/>}
            {data.foodType=="veg" ? "Veg" : "Non-Veg"}
          </span>
        </div>
        <img src={data.image} alt="" className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'/>
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'></div>
      </div>

      <div className="flex-1 flex flex-col p-4">
        <h1 className='font-bold text-gray-800 text-[15px] truncate'>{data.name}</h1>

        <div className='flex items-center gap-1.5 mt-1.5'>
          <div className='flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-md'>
            {renderStars(data.rating?.average || 0)}
          </div>
          <span className='text-xs text-gray-400 font-medium'>
            ({data.rating?.count || 0})
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between mt-auto p-4 pt-0'>
        <span className='font-black text-gray-800 text-lg'>
          ₹{data.price}
        </span>

        <div className='flex items-center bg-gray-50 rounded-xl overflow-hidden border border-gray-100'>
          <button className='px-2.5 py-2 hover:bg-gray-100 transition-colors cursor-pointer' onClick={handleDecrease}>
            <FaMinus size={11} className='text-gray-600'/>
          </button>
          <span className='text-sm font-bold text-gray-800 w-6 text-center'>{quantity}</span>
          <button className='px-2.5 py-2 hover:bg-gray-100 transition-colors cursor-pointer' onClick={handleIncrease}>
            <FaPlus size={11} className='text-gray-600'/>
          </button>
          <button className={`${
            cartItems.some(i=>i.id==data._id)
              ? 'bg-gray-800' 
              : 'bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a]'
          } text-white px-3.5 py-2 transition-all duration-300 cursor-pointer hover:shadow-lg`}  onClick={()=>{
    quantity>0?dispatch(addToCart({
          id:data._id,
          name:data.name,
          price:data.price,
          image:data.image,
          shop:data.shop,
          quantity,
          foodType:data.foodType
})):null}}>
            <FaShoppingCart size={14}/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
