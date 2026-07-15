import React from 'react'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { serverUrl } from '../App';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { FiUser, FiMail, FiLock, FiPhone, FiArrowRight } from "react-icons/fi";
function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate=useNavigate()
    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [mobile,setMobile]=useState("")
    const [err,setErr]=useState("")
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
     const handleSignUp=async () => {
        setLoading(true)
        try {
            const result=await axios.post(`${serverUrl}/api/auth/signup`,{
                fullName,email,password,mobile,role
            },{withCredentials:true})
            dispatch(setUserData(result.data))
            setErr("")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
             setLoading(false)
        }
     }

     const handleGoogleAuth=async () => {
        if(!mobile){
          return setErr("mobile no is required")
        }
        const provider=new GoogleAuthProvider()
        const result=await signInWithPopup(auth,provider)
  try {
    const {data}=await axios.post(`${serverUrl}/api/auth/google-auth`,{
        fullName:result.user.displayName,
        email:result.user.email,
        role,
        mobile
    },{withCredentials:true})
   dispatch(setUserData(data))
  } catch (error) {
    console.log(error)
  }
     }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 gradient-bg relative overflow-hidden'>
            {/* Background decorative elements */}
            <div className='absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#ff4d2d]/20 to-transparent blur-3xl'></div>
            <div className='absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-[#ffb347]/20 to-transparent blur-3xl'></div>
            <div className='absolute top-[30%] left-[5%] w-[200px] h-[200px] rounded-full bg-gradient-to-br from-[#ff6b4a]/10 to-transparent blur-2xl animate-float'></div>

            <div className='bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-10 border border-white/50 relative animate-scale-in'>
                {/* Accent line */}
                <div className='absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-[#ff4d2d] to-[#ffb347] rounded-full'></div>

                {/* Logo */}
                <div className='text-center mb-2'>
                    <h1 className='text-5xl font-black text-gradient mb-2 tracking-tight'>BiteHUB</h1>
                    <div className='w-12 h-0.5 bg-gradient-to-r from-[#ff4d2d] to-[#ffb347] mx-auto rounded-full'></div>
                </div>
                <p className='text-gray-500 mb-8 text-center text-sm'>Create your account to get started</p>

                {/* Role Selector */}
                <div className='mb-5'>
                    <label className='block text-gray-600 font-semibold mb-3 text-xs uppercase tracking-wider'>I want to join as</label>
                    <div className='flex gap-2'>
                        {["user", "owner", "deliveryBoy"].map((r) => (
                            <button
                                key={r}
                                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer capitalize ${
                                    role === r
                                        ? 'bg-gradient-to-r from-[#ff4d2d] to-[#ff6b4a] text-white shadow-lg shadow-[#ff4d2d]/30'
                                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100'
                                }`}
                                onClick={()=>setRole(r)}>
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Full Name */}
                <div className='mb-3'>
                    <label className='block text-gray-600 font-semibold mb-2 text-xs uppercase tracking-wider'>Full Name</label>
                    <div className='relative'>
                        <FiUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            type="text"
                            className='w-full border-0 bg-gray-50 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:bg-white transition-all duration-300 text-sm'
                            placeholder='Enter your full name'
                            onChange={(e)=>setFullName(e.target.value)}
                            value={fullName}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className='mb-3'>
                    <label className='block text-gray-600 font-semibold mb-2 text-xs uppercase tracking-wider'>Email</label>
                    <div className='relative'>
                        <FiMail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            type="email"
                            className='w-full border-0 bg-gray-50 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:bg-white transition-all duration-300 text-sm'
                            placeholder='Enter your email'
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
                </div>

                {/* Mobile */}
                <div className='mb-3'>
                    <label className='block text-gray-600 font-semibold mb-2 text-xs uppercase tracking-wider'>Mobile</label>
                    <div className='relative'>
                        <FiPhone className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            type="text"
                            className='w-full border-0 bg-gray-50 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:bg-white transition-all duration-300 text-sm'
                            placeholder='Enter your mobile number'
                            onChange={(e)=>setMobile(e.target.value)}
                            value={mobile}
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div className='mb-5'>
                    <label className='block text-gray-600 font-semibold mb-2 text-xs uppercase tracking-wider'>Password</label>
                    <div className='relative'>
                        <FiLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                        <input
                            type={showPassword ? "text" : "password"}
                            className='w-full border-0 bg-gray-50 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:bg-white transition-all duration-300 text-sm pr-10'
                            placeholder='Min 6 characters'
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ff4d2d] transition-colors cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                </div>

                {/* Sign Up Button */}
                <button
                    className='w-full btn-primary text-white font-bold py-3.5 rounded-xl text-sm tracking-wide cursor-pointer flex items-center justify-center gap-2'
                    onClick={handleSignUp}
                    disabled={loading}>
                    {loading ? <ClipLoader size={20} color='white'/> : <><span>Create Account</span><FiArrowRight /></>}
                </button>

                {err && (
                    <div className='mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-center'>
                        <p className='text-red-500 text-sm font-medium'>*{err}</p>
                    </div>
                )}

                {/* Divider */}
                <div className='flex items-center gap-4 my-6'>
                    <div className='flex-1 h-px bg-gradient-to-r from-transparent to-gray-200'></div>
                    <span className='text-gray-400 text-xs font-medium'>OR</span>
                    <div className='flex-1 h-px bg-gradient-to-l from-transparent to-gray-200'></div>
                </div>

                {/* Google Auth */}
                <button className='w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer hover:border-gray-200 hover:shadow-md active:scale-[0.98]' onClick={handleGoogleAuth}>
                    <FcGoogle size={20}/>
                    <span className='text-gray-600 font-semibold text-sm'>Continue with Google</span>
                </button>

                {/* Sign In Link */}
                <p className='text-center mt-8 text-gray-500 text-sm'>
                    Already have an account?{' '}
                    <span className='text-[#ff4d2d] font-bold cursor-pointer hover:text-[#e64323] transition-colors' onClick={()=>navigate("/signin")}>Sign In</span>
                </p>
            </div>
        </div>
    )
}

export default SignUp
