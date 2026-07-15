import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
function CartPage() {
    const navigate = useNavigate()
    const { cartItems, totalAmount } = useSelector(state => state.user)
    return (
        <div className='min-h-screen bg-[#fff9f6] flex justify-center p-6'>
            <div className='w-full max-w-[800px] mt-24'>
                <div className='flex items-center gap-4 mb-8'>
                    <button className='w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer' onClick={() => navigate("/")}>
                        <IoIosArrowRoundBack size={24} className='text-[#ff4d2d]' />
                    </button>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-800'>Your Cart</h1>
                        <p className='text-sm text-gray-400'>{cartItems?.length} item{cartItems?.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
                {cartItems?.length == 0 ? (
                    <div className='bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100'>
                        <div className='w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4'>
                            <FiShoppingBag size={32} className='text-[#ff4d2d]'/>
                        </div>
                        <p className='text-gray-500 text-lg font-medium'>Your cart is empty</p>
                        <p className='text-gray-400 text-sm mt-1'>Add items to get started</p>
                        <button className='mt-6 px-6 py-3 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white rounded-xl font-semibold text-sm shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl transition-all cursor-pointer' onClick={()=>navigate("/")}>Browse Menu</button>
                    </div>
                ) : (<>
                    <div className='space-y-4'>
                        {cartItems?.map((item, index) => (
                            <CartItemCard data={item} key={index} />
                        ))}
                    </div>
                    <div className='mt-6 bg-white p-5 rounded-2xl shadow-lg flex justify-between items-center border border-gray-100'>
                        <h1 className='text-lg font-bold text-gray-800'>Total Amount</h1>
                        <span className='text-xl font-black text-[#ff4d2d]'>₹{totalAmount}</span>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <button className='flex items-center gap-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl hover:shadow-[#ff4d2d]/30 transition-all cursor-pointer' onClick={()=>navigate("/checkout")}>
                            <span>Proceed to Checkout</span>
                            <FiArrowRight size={18}/>
                        </button>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

export default CartPage
