import axios from 'axios';
import React from 'react'
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({data}) {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleDelete=async () => {
      try {
        const result=await axios.get(`${serverUrl}/api/item/delete/${data._id}`,{withCredentials:true})
        dispatch(setMyShopData(result.data))
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className='flex bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 w-full hover:shadow-lg transition-all duration-300 card-hover'>
      <div className='w-36 flex-shrink-0 overflow-hidden'>
        <img src={data.image} alt="" className='w-full h-full object-cover hover:scale-105 transition-transform duration-500'/>
      </div>
      <div className='flex flex-col justify-between p-4 flex-1'>
          <div>
            <h2 className='text-base font-bold text-gray-800'>{data.name}</h2>
            <p className='text-xs text-gray-400 mt-1'><span className='font-semibold text-gray-500'>Category:</span> {data.category}</p>
            <p className='text-xs text-gray-400'><span className='font-semibold text-gray-500'>Type:</span> <span className={`font-medium ${data.foodType === 'veg' ? 'text-emerald-600' : 'text-red-500'}`}>{data.foodType}</span></p>
          </div>
          <div className='flex items-center justify-between mt-3'>
            <div className='text-[#ff4d2d] font-black text-lg'>₹{data.price}</div>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 cursor-pointer rounded-lg bg-orange-50 hover:bg-[#ff4d2d] hover:text-white flex items-center justify-center text-[#ff4d2d] transition-all' onClick={()=>navigate(`/edit-item/${data._id}`)}>
                <FaPen size={13}/>
              </div>
              <div className='w-8 h-8 cursor-pointer rounded-lg bg-red-50 hover:bg-red-500 hover:text-white flex items-center justify-center text-red-500 transition-all' onClick={handleDelete}>
                <FaTrashAlt size={13}/>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default OwnerItemCard
