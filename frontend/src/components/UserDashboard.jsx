import React, { useEffect, useRef, useState } from 'react'
import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import FoodCard from './FoodCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { FiMapPin, FiTrendingUp, FiStar } from "react-icons/fi";

function UserDashboard() {
  const {currentCity,shopInMyCity,itemsInMyCity,searchItems}=useSelector(state=>state.user)
  const cateScrollRef=useRef()
  const shopScrollRef=useRef()
  const navigate=useNavigate()
  const [showLeftCateButton,setShowLeftCateButton]=useState(false)
  const [showRightCateButton,setShowRightCateButton]=useState(false)
   const [showLeftShopButton,setShowLeftShopButton]=useState(false)
  const [showRightShopButton,setShowRightShopButton]=useState(false)
  const [updatedItemsList,setUpdatedItemsList]=useState([])

const handleFilterByCategory=(category)=>{
if(category=="All"){
  setUpdatedItemsList(itemsInMyCity)
}else{
  const filteredList=itemsInMyCity?.filter(i=>i.category===category)
  setUpdatedItemsList(filteredList)
}

}

useEffect(()=>{
setUpdatedItemsList(itemsInMyCity)
},[itemsInMyCity])


  const updateButton=(ref,setLeftButton,setRightButton)=>{
const element=ref.current
if(element){
setLeftButton(element.scrollLeft>0)
setRightButton(element.scrollLeft+element.clientWidth<element.scrollWidth)

}
  }
  const scrollHandler=(ref,direction)=>{
    if(ref.current){
      ref.current.scrollBy({
        left:direction=="left"?-200:200,
        behavior:"smooth"
      })
    }
  }




  useEffect(()=>{
    if(cateScrollRef.current){
      updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
      updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      cateScrollRef.current.addEventListener('scroll',()=>{
        updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
      })
      shopScrollRef.current.addEventListener('scroll',()=>{
         updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      })
     
    }

    return ()=>{cateScrollRef?.current?.removeEventListener("scroll",()=>{
        updateButton(cateScrollRef,setShowLeftCateButton,setShowRightCateButton)
      })
         shopScrollRef?.current?.removeEventListener("scroll",()=>{
        updateButton(shopScrollRef,setShowLeftShopButton,setShowRightShopButton)
      })}

  },[categories])


  return (
    <div className='w-screen min-h-screen flex flex-col items-center bg-[#fff9f6] overflow-y-auto'>
      <Nav />

      {searchItems && searchItems.length>0 && (
        <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-6 bg-white shadow-lg rounded-3xl mt-24 mx-4 border border-gray-100 animate-slideUp'>
          <h1 className='text-gray-800 text-2xl sm:text-3xl font-bold border-b border-gray-100 pb-3'>
            Search Results
          </h1>
          <div className='w-full flex flex-wrap gap-5 justify-center'>
            {searchItems.map((item)=>(
              <FoodCard data={item} key={item._id}/>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className='w-full max-w-6xl px-5 mt-24 mb-2'>
        <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff4d2d] via-[#ff6b4a] to-[#ffb347] p-8 md:p-12 text-white shadow-2xl shadow-[#ff4d2d]/20'>
          <div className='absolute top-[-50%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/10 blur-3xl animate-float'></div>
          <div className='absolute bottom-[-30%] left-[-5%] w-[200px] h-[200px] rounded-full bg-white/10 blur-2xl animate-float' style={{animationDelay:'1s'}}></div>
          <div className='relative z-10'>
            <div className='flex items-center gap-2 mb-3'>
              <FiMapPin size={18} className='text-white/80'/>
              <span className='text-white/80 text-sm font-medium'>{currentCity || 'Your City'}</span>
            </div>
            <h1 className='text-3xl md:text-5xl font-black mb-3 leading-tight tracking-tight'>
              Hungry? <br/>
              <span className='text-white/90'>We've got you covered.</span>
            </h1>
            <p className='text-white/70 text-sm md:text-base max-w-md'>Order from the best local restaurants with easy, on-demand delivery.</p>
            <div className='flex items-center gap-6 mt-6'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'><FiTrendingUp size={16}/></div>
                <div><div className='text-xs text-white/60'>Restaurants</div><div className='font-bold text-sm'>{shopInMyCity?.length || 0}+</div></div>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'><FiStar size={16}/></div>
                <div><div className='text-xs text-white/60'>Food Items</div><div className='font-bold text-sm'>{itemsInMyCity?.length || 0}+</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="w-full max-w-6xl flex flex-col gap-4 items-start px-5 mt-6">
        <h1 className='text-gray-800 text-xl sm:text-2xl font-bold tracking-tight'>What's on your mind?</h1>
        <div className='w-full relative'>
          {showLeftCateButton &&  <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-2 rounded-full shadow-lg hover:shadow-xl z-10 transition-all cursor-pointer' onClick={()=>scrollHandler(cateScrollRef,"left")}><FaCircleChevronLeft size={28}/></button>}

          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide' ref={cateScrollRef}>
            {categories.map((cate, index) => (
              <CategoryCard name={cate.category} image={cate.image} key={index} onClick={()=>handleFilterByCategory(cate.category)}/>
            ))}
          </div>
          {showRightCateButton &&  <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-2 rounded-full shadow-lg hover:shadow-xl z-10 transition-all cursor-pointer' onClick={()=>scrollHandler(cateScrollRef,"right")}><FaCircleChevronRight size={28}/></button>}
        </div>
      </div>

      {/* Shops */}
      <div className='w-full max-w-6xl flex flex-col gap-4 items-start px-5 mt-6'>
       <h1 className='text-gray-800 text-xl sm:text-2xl font-bold tracking-tight'>Best Shops in {currentCity}</h1>
       <div className='w-full relative'>
          {showLeftShopButton &&  <button className='absolute left-0 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-2 rounded-full shadow-lg hover:shadow-xl z-10 transition-all cursor-pointer' onClick={()=>scrollHandler(shopScrollRef,"left")}><FaCircleChevronLeft size={28}/></button>}

          <div className='w-full flex overflow-x-auto gap-4 pb-2 scrollbar-hide' ref={shopScrollRef}>
            {shopInMyCity?.map((shop, index) => (
              <CategoryCard name={shop.name} image={shop.image} key={index} onClick={()=>navigate(`/shop/${shop._id}`)}/>
            ))}
          </div>
          {showRightShopButton &&  <button className='absolute right-0 top-1/2 -translate-y-1/2 bg-white text-[#ff4d2d] p-2 rounded-full shadow-lg hover:shadow-xl z-10 transition-all cursor-pointer' onClick={()=>scrollHandler(shopScrollRef,"right")}><FaCircleChevronRight size={28}/></button>}
       </div>
      </div>

      {/* Food Items */}
      <div className='w-full max-w-6xl flex flex-col gap-4 items-start px-5 mt-6 mb-10'>
       <h1 className='text-gray-800 text-xl sm:text-2xl font-bold tracking-tight'>Suggested Food Items</h1>
        <div className='w-full flex flex-wrap gap-5 justify-center'>
          {updatedItemsList?.map((item,index)=>(
            <FoodCard key={index} data={item}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
