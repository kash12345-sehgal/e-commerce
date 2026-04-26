/* eslint-disable no-unused-vars */
import React from 'react'
import { Routes,Route } from 'react-router-dom'


import About from './pages/About'

import Login from './pages/Login'


import Navbar from './components/Navbar'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Home from './pages/Home'
import Footer from './components/Footer'

import  Contact from './pages/contact'
import Collection from './pages/collection'
import SearchBar from './components/SearchBar'

 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
import PlaceOrder from './pages/placeOrder'
import Orders from './pages/Orders'
import AddProduct from './pages/AddProduct'





 

const App = () => {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <ToastContainer/>
   <Navbar/>
   
<SearchBar/>
  <Routes>
    
    <Route path='/collection' element={<Collection/>}/>
     <Route path='/about' element={<About/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/product/:productId' element={<Product/>}/>
      <Route path='/orders' element={<Orders/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
         <Route path='/place-order' element={<PlaceOrder/>}/>
     <Route path='/home' element={<Home/>}/>
<Route path ='/' element={<Home/>}/>
    <Route path='/add-product' element={<AddProduct/>}/>



  </Routes>
  <Footer/>
  
    </div>
  )
}

export default App