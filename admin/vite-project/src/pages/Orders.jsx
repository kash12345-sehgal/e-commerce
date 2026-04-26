/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {backendUrl} from '../App'
import toast from 'react_toastify'
const Orders = ({token}) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
  
    if (!token) {
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token }})
      if (response.data.success) {
        setOrders(response.data.orders)
       
      } else {
        toast.error(response.data.message)

      }

    } catch (error) {
toast.error(error.message)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllOrders();
  }, [token])

  return (
    <div>
<h3>Order Page</h3>
<div>
  {
    orders.map((order,index) => (
      <div key={index}>
        <img src={assets.parcel_icon} alt=''/>
        <div>
          {orders.items.map(()=>{
            
          })}
          </div>
      </div>
    ))
}
</div>
    </div>
  )
}

export default Orders