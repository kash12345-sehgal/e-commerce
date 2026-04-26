import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'
const ProductItems = ({id,image, name, price}) => {
    const {currency}=useContext(ShopContext);
  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}> 
    <div className='overflow-hidden'>
     <img  className= 'hover:scale-110 transition ease-in-out w-full h-auto'src={image && image[0] ? image[0] : ''} alt={name} onError={(e) => {e.target.src = 'https://placehold.co/400x400?text=No+Image'}}/>
     </div>
    <p className='text-sm font-medium'>{name}</p>
    <p className='text-sm font-medium'>{currency}{price}</p>
    
     </Link>
  )
}

export default ProductItems