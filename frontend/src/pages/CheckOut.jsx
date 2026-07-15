import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css"
import { setAddress, setLocation } from '../redux/mapSlice';
import { MdDeliveryDining } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import axios from 'axios';
import { FaMobileScreenButton } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { addMyOrder, setTotalAmount } from '../redux/userSlice';
import { FiArrowRight, FiCheck } from "react-icons/fi";
function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    const map = useMap()
    map.setView([location.lat, location.lon], 16, { animate: true })
  }
  return null

}

function CheckOut() {
  const { location, address } = useSelector(state => state.map)
    const { cartItems ,totalAmount,userData} = useSelector(state => state.user)
  const [addressInput, setAddressInput] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const apiKey = import.meta.env.VITE_GEOAPIKEY
  const deliveryFee=totalAmount>500?0:40
  const AmountWithDeliveryFee=totalAmount+deliveryFee





  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng
    dispatch(setLocation({ lat, lon: lng }))
    getAddressByLatLng(lat, lng)
  }
  const getCurrentLocation = () => {
      const latitude=userData.location.coordinates[1]
      const longitude=userData.location.coordinates[0]
      dispatch(setLocation({ lat: latitude, lon: longitude }))
      getAddressByLatLng(latitude, longitude)
   

  }

  const getAddressByLatLng = async (lat, lng) => {
    try {

      const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${apiKey}`)
      dispatch(setAddress(result?.data?.results[0].address_line2))
    } catch (error) {
      console.log(error)
    }
  }

  const getLatLngByAddress = async () => {
    try {
      const result = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressInput)}&apiKey=${apiKey}`)
      const { lat, lon } = result.data.features[0].properties
      dispatch(setLocation({ lat, lon }))
    } catch (error) {
      console.log(error)
    }
  }

  const handlePlaceOrder=async () => {
    try {
      const result=await axios.post(`${serverUrl}/api/order/place-order`,{
        paymentMethod,
        deliveryAddress:{
          text:addressInput,
          latitude:location.lat,
          longitude:location.lon
        },
        totalAmount:AmountWithDeliveryFee,
        cartItems
      },{withCredentials:true})

      if(paymentMethod=="cod"){
      dispatch(addMyOrder(result.data))
      navigate("/order-placed")
      }else{
        const orderId=result.data.orderId
        const razorOrder=result.data.razorOrder
          openRazorpayWindow(orderId,razorOrder)
       }
    
    } catch (error) {
      console.log(error)
    }
  }

const openRazorpayWindow=(orderId,razorOrder)=>{

  const options={
 key:import.meta.env.VITE_RAZORPAY_KEY_ID,
 amount:razorOrder.amount,
 currency:'INR',
 name:"BiteHUB",
 description:"Food Delivery Website",
 order_id:razorOrder.id,
 handler:async function (response) {
  try {
    const result=await axios.post(`${serverUrl}/api/order/verify-payment`,{
      razorpay_payment_id:response.razorpay_payment_id,
      orderId
    },{withCredentials:true})
        dispatch(addMyOrder(result.data))
      navigate("/order-placed")
  } catch (error) {
    console.log(error)
  }
 }
  }

  const rzp=new window.Razorpay(options)
  rzp.open()


}


  useEffect(() => {
    setAddressInput(address)
  }, [address])
  return (
    <div className='min-h-screen bg-[#fff9f6] flex items-center justify-center p-6'>
      <button className='fixed top-6 left-6 z-[10] w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer' onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={24} className='text-[#ff4d2d]' />
      </button>
      <div className='w-full max-w-[900px] bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100 mt-16 animate-slideUp'>
        <h1 className='text-2xl font-black text-gray-800 tracking-tight'>Checkout</h1>

        <section>
          <h2 className='text-sm font-bold mb-3 flex items-center gap-2 text-gray-800 uppercase tracking-wider'>
            <IoLocationSharp className='text-[#ff4d2d]' size={16}/> Delivery Location
          </h2>
          <div className='flex gap-2 mb-3'>
            <input type="text" className='flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:bg-white transition-all border border-gray-100' placeholder='Enter Your Delivery Address..' value={addressInput} onChange={(e) => setAddressInput(e.target.value)} />
            <button className='bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white px-4 py-3 rounded-xl flex items-center justify-center shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl transition-all cursor-pointer' onClick={getLatLngByAddress}><IoSearchOutline size={17} /></button>
            <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all cursor-pointer' onClick={getCurrentLocation}><TbCurrentLocation size={17} /></button>
          </div>
          <div className='rounded-2xl border border-gray-100 overflow-hidden shadow-sm'>
            <div className='h-64 w-full flex items-center justify-center'>
              <MapContainer
                className={"w-full h-full"}
                center={[location?.lat, location?.lon]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker position={[location?.lat, location?.lon]} draggable eventHandlers={{ dragend: onDragEnd }} />

              </MapContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-sm font-bold mb-3 text-gray-800 uppercase tracking-wider'>Payment Method</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 cursor-pointer ${
              paymentMethod === "cod" 
                ? "border-[#ff4d2d] bg-orange-50 shadow-lg shadow-[#ff4d2d]/10" 
                : "border-gray-100 hover:border-gray-200"
            }`} onClick={() => setPaymentMethod("cod")}>
              <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/20'>
                <MdDeliveryDining className='text-white text-xl' />
              </span>
              <div>
                <p className='font-bold text-gray-800 text-sm'>Cash On Delivery</p>
                <p className='text-xs text-gray-400'>Pay when your food arrives</p>
              </div>
              {paymentMethod === "cod" && <FiCheck size={18} className='text-[#ff4d2d] ml-auto'/>}
            </div>
            <div className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 cursor-pointer ${
              paymentMethod === "online" 
                ? "border-[#ff4d2d] bg-orange-50 shadow-lg shadow-[#ff4d2d]/10" 
                : "border-gray-100 hover:border-gray-200"
            }`} onClick={() => setPaymentMethod("online")}>
              <span className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-400 to-blue-500 shadow-lg shadow-purple-500/20'>
                <FaCreditCard className='text-white text-lg' />
              </span>
              <div>
                <p className='font-bold text-gray-800 text-sm'>UPI / Card</p>
                <p className='text-xs text-gray-400'>Pay Securely Online</p>
              </div>
              {paymentMethod === "online" && <FiCheck size={18} className='text-[#ff4d2d] ml-auto'/>}
            </div>
          </div>
        </section>

        <section>
          <h2 className='text-sm font-bold mb-3 text-gray-800 uppercase tracking-wider'>Order Summary</h2>
          <div className='rounded-2xl bg-gray-50 p-5 space-y-2 border border-gray-100'>
            {cartItems.map((item,index)=>(
              <div key={index} className='flex justify-between text-sm text-gray-600'>
                <span>{item.name} x {item.quantity}</span>
                <span className='font-medium'>₹{item.price*item.quantity}</span>
              </div>
            ))}
            <div className='h-px bg-gray-200 my-2'></div>
            <div className='flex justify-between font-medium text-gray-800 text-sm'>
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className='flex justify-between text-gray-500 text-sm'>
              <span>Delivery Fee</span>
              <span>{deliveryFee==0?"Free":`₹${deliveryFee}`}</span>
            </div>
            <div className='flex justify-between text-lg font-black text-[#ff4d2d] pt-2'>
              <span>Total</span>
              <span>₹{AmountWithDeliveryFee}</span>
            </div>
          </div>
        </section>
        <button className='w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#ff4d2d]/20 hover:shadow-xl hover:shadow-[#ff4d2d]/30 transition-all cursor-pointer' onClick={handlePlaceOrder}>
          <span>{paymentMethod=="cod"?"Place Order":"Pay & Place Order"}</span>
          <FiArrowRight size={18}/>
        </button>
      </div>
    </div>
  )
}

export default CheckOut
