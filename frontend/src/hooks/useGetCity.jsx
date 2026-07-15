import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import {  setCurrentAddress, setCurrentCity, setCurrentState, setUserData } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

function useGetCity() {
    const dispatch=useDispatch()
    const {userData}=useSelector(state=>state.user)
    const apiKey=import.meta.env.VITE_GEOAPIKEY
    useEffect(()=>{
navigator.geolocation.getCurrentPosition(async (position)=>{
    console.log(position)
    const latitude=position.coords.latitude
    const longitude=position.coords.longitude
    dispatch(setLocation({lat:latitude,lon:longitude}))
    const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
  console.log(result.data)
    dispatch(setCurrentCity(result?.data?.results[0].city||result?.data?.results[0].county
))
    dispatch(setCurrentState(result?.data?.results[0].state))
     dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1 ))
  dispatch(setAddress(result?.data?.results[0].address_line2))
}, async (error) => {
    console.log("Geolocation failed or was denied. Using fallback (Indore):", error)
    const latitude = 22.7196
    const longitude = 75.8577
    dispatch(setLocation({lat:latitude,lon:longitude}))
    try {
        const result=await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`)
        dispatch(setCurrentCity(result?.data?.results[0].city||result?.data?.results[0].county||"Indore"))
        dispatch(setCurrentState(result?.data?.results[0].state||"Madhya Pradesh"))
        dispatch(setCurrentAddress(result?.data?.results[0].address_line2 || result?.data?.results[0].address_line1 || "Indore, Madhya Pradesh"))
        dispatch(setAddress(result?.data?.results[0].address_line2 || "Indore, Madhya Pradesh"))
    } catch (err) {
        console.log("Geocoding API fallback failed:", err)
        dispatch(setCurrentCity("Indore"))
        dispatch(setCurrentState("Madhya Pradesh"))
        dispatch(setCurrentAddress("Indore, Madhya Pradesh"))
        dispatch(setAddress("Indore, Madhya Pradesh"))
    }
})
    },[userData])
}

export default useGetCity
