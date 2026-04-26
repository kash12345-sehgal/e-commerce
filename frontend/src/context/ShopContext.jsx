
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const[token,setToken] = useState('');
  const[userId,setUserId] = useState('');
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if(token){
      try {
         await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })   
  }    catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
}

  const getCartCount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token){
      try {
         await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })   
  }    catch (error) {
        console.log(error);
        toast.error(error.message)
      } 
    }
  };

  // ✅ Fix 1: `async =>` galat tha, `() =>` kiya
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
const getUserCart = async (token) => {
  try {
    const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
    if (response.data.success) {
      setCartItems(response.data.cartData)
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
}

  useEffect(() => {
    getProductsData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if(!token&&localStorage.getItem('token')){
        const savedToken = localStorage.getItem('token')
        setToken(savedToken)
        const decoded = jwtDecode(savedToken);
        setUserId(decoded.userId);
        getUserCart(savedToken)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  const value = {
    products, currency, delivery_fee,
    search, setSearch, showSearch, setShowSearch,
    cartItems, addToCart, getCartCount, updateQuantity, getCartAmount,
    navigate, backendUrl,setToken,token,userId,setUserId,setCartItems
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;