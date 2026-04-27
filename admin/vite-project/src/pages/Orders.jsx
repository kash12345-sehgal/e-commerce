/* eslint-disable no-unused-vars */



import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'


const Orders = ({token}) => {
  const [orders,setOrders]= useState([])
    const fetchAllOrders = async () => {
      if(!token){
        return null;
      }
      try{
        const response = await axios.post(backendUrl+'/api/order/list',{},{header:{token}})
console.log(response.data)
      }catch(error){

      }
      
    }
    useEffect(()=>{
fetchAllOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])
  
  return (
    <div>

    </div>
  )
}

export default Orders