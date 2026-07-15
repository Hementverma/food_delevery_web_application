import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { setSearchItems, setUserData } from '../redux/userSlice';
import { FaPlus } from "react-icons/fa6";
import { TbReceipt2 } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
function Nav() {
    const { userData, currentCity ,cartItems} = useSelector(state => state.user)
        const { myShopData} = useSelector(state => state.owner)
    const [showInfo, setShowInfo] = useState(false)
    const [showSearch, setShowSearch] = useState(false)
    const [query,setQuery]=useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchItems=async () => {
      try {
        const result=await axios.get(`${serverUrl}/api/item/search-items?query=${query}&city=${currentCity}`,{withCredentials:true})
    dispatch(setSearchItems(result.data))
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        if(query){
handleSearchItems()
        }else{
              dispatch(setSearchItems(null))
        }

    },[query])
    return (
        <div className='w-full h-[72px] flex items-center justify-between md:justify-center gap-6 px-5 fixed top-0 z-[9999] glass border-b border-white/20'>

            {showSearch && userData.role == "user" && <div className='w-[92%] h-[60px] glass rounded-2xl items-center gap-4 flex fixed top-[80px] left-[4%] md:hidden shadow-lg'>
                <div className='flex items-center w-[35%] overflow-hidden gap-2 px-3 border-r border-gray-200'>
                    <FaLocationDot size={18} className="text-[#ff4d2d]" />
                    <div className='w-[80%] truncate text-gray-600 text-sm'>{currentCity}</div>
                </div>
                <div className='w-[80%] flex items-center gap-2'>
                    <IoIosSearch size={20} className='text-gray-400' />
                    <input type="text" placeholder='Search food, restaurants...' className='text-gray-700 outline-0 w-full text-sm bg-transparent' onChange={(e)=>setQuery(e.target.value)} value={query}/>
                </div>
            </div>}



            <h1 className='text-2xl font-black text-gradient tracking-tight cursor-pointer' onClick={()=>navigate("/")}>BiteHUB</h1>
            {userData.role == "user" && <div className='md:w-[55%] lg:w-[40%] h-[48px] glass rounded-2xl items-center gap-3 hidden md:flex shadow-sm'>
                <div className='flex items-center w-[30%] overflow-hidden gap-2 px-4 border-r border-gray-200'>
                    <FaLocationDot size={16} className="text-[#ff4d2d]" />
                    <div className='w-[80%] truncate text-gray-600 text-sm'>{currentCity}</div>
                </div>
                <div className='w-[80%] flex items-center gap-2'>
                    <IoIosSearch size={18} className='text-gray-400' />
                    <input type="text" placeholder='Search food, restaurants...' className='text-gray-700 outline-0 w-full text-sm bg-transparent' onChange={(e)=>setQuery(e.target.value)} value={query}/>
                </div>
            </div>}

            <div className='flex items-center gap-3'>
                {userData.role == "user" && (showSearch ? <RxCross2 size={22} className='text-gray-500 md:hidden cursor-pointer hover:text-[#ff4d2d] transition-colors' onClick={() => setShowSearch(false)} /> : <IoIosSearch size={22} className='text-gray-500 md:hidden cursor-pointer hover:text-[#ff4d2d] transition-colors' onClick={() => setShowSearch(true)} />)
                }
                {userData.role == "owner"? <>
                 {myShopData && <> <button className='hidden md:flex items-center gap-2 px-4 py-2 cursor-pointer rounded-xl bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white text-sm font-semibold shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl hover:shadow-[#ff4d2d]/30 transition-all duration-300' onClick={()=>navigate("/add-item")}>
                        <FaPlus size={14} />
                        <span>Add Food</span>
                    </button>
                      <button className='md:hidden flex items-center p-2 cursor-pointer rounded-xl bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white shadow-lg shadow-[#ff4d2d]/20' onClick={()=>navigate("/add-item")}>
                        <FaPlus size={18} />
                    </button></>}
                   
                    <div className='hidden md:flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl bg-orange-50 text-[#ff4d2d] font-semibold text-sm hover:bg-orange-100 transition-colors' onClick={()=>navigate("/my-orders")}>
                      <TbReceipt2 size={18}/>
                      <span>My Orders</span>
                    </div>
                     <div className='md:hidden flex items-center p-2 cursor-pointer rounded-xl bg-orange-50 text-[#ff4d2d]' onClick={()=>navigate("/my-orders")}>
                      <TbReceipt2 size={20}/>
                     </div>
                </>: (
                    <>
                 {userData.role=="user" &&    <div className='relative cursor-pointer p-2 rounded-xl hover:bg-orange-50 transition-colors' onClick={()=>navigate("/cart")}>
                    <FiShoppingCart size={22} className='text-[#ff4d2d]' />
                    {cartItems.length > 0 && <span className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg'>{cartItems.length}</span>}
                </div>}   
           

                <button className='hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-50 text-[#ff4d2d] text-sm font-semibold hover:bg-orange-100 transition-colors cursor-pointer' onClick={()=>navigate("/my-orders")}>
                    <TbReceipt2 size={18}/>
                    My Orders
                </button>
                    </>
                )}



                <div className='w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#ff4d2d] to-[#ff6b4a] text-white text-sm shadow-lg shadow-[#ff4d2d]/30 cursor-pointer font-bold hover:scale-105 transition-transform' onClick={() => setShowInfo(prev => !prev)}>
                    {userData?.fullName.slice(0, 1)}
                </div>
                {showInfo && <>
                    <div className='fixed inset-0 z-[9998]' onClick={() => setShowInfo(false)}></div>
                    <div className={`fixed top-[80px] right-[10px] 
                    ${userData.role=="deliveryBoy"?"md:right-[20%] lg:right-[40%]":"md:right-[10%] lg:right-[25%]"} w-[200px] glass rounded-2xl p-5 flex flex-col gap-3 z-[9999] shadow-2xl animate-scale-in`}>
                        <div className='font-bold text-gray-800'>{userData.fullName}</div>
                        <div className='text-xs text-gray-400 uppercase tracking-wider font-medium'>{userData.role}</div>
                        <div className='h-px bg-gray-200 my-1'></div>
                        {userData.role=="user" && <div className='md:hidden text-[#ff4d2d] font-semibold cursor-pointer text-sm hover:text-[#e64323] transition-colors' onClick={()=>{navigate("/my-orders");setShowInfo(false)}}>My Orders</div>}
                        
                        <div className='flex items-center gap-2 text-[#ff4d2d] font-semibold cursor-pointer text-sm hover:text-[#e64323] transition-colors' onClick={handleLogOut}>
                            <FiLogOut size={16}/>
                            <span>Log Out</span>
                        </div>
                    </div>
                </>}

            </div>
        </div>
    )
}


export default Nav
