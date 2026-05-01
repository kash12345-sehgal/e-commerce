 
 
import React, { useEffect, useState } from "react";
import { useContext } from "react";

import Title from "./Title";
import ProductItems from "./ProductItem";
import { ShopContext } from "../context/ShopContext";


const LatestCollection = () => {
  const{ products} = useContext(ShopContext);
  const [LatestProducts,setLatestProducts]=useState([]);

useEffect(()=>{
    if (products && products.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLatestProducts(products.slice(0,10));
    }
},[products])
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl ">
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
      <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
💫 Explore our newest collection designed with premium quality, timeless elegance, and modern trends to elevate your everyday style effortlessly 💕
Each piece is made to enhance your beauty, boost your confidence, and give you that perfect standout look wherever you go ✨
      </p>
      </div>
{/* Renderin products */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
  
   {
    LatestProducts.map((item,index)=>(
      <ProductItems key ={index} id={item._id} image={item.image} name={item.name} price={item.price} />
    ))
   }
    </div>
    </div>
  );
};

export default LatestCollection;