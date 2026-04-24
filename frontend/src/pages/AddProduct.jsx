import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [price, setPrice] = useState('')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [sizes, setSizes] = useState([])
  const [bestseller, setBestseller] = useState(false)
  const [images, setImages] = useState([null, null, null, null])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

  const handleSizeChange = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size))
    } else {
      setSizes([...sizes, size])
    }
  }

  const handleImageChange = (e, index) => {
    const file = e.target.files[0]
    if (file) {
      const newImages = [...images]
      newImages[index] = file
      setImages(newImages)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('price', price)
      formData.append('subCategory', subCategory)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', bestseller)

      // Debug: Check images before appending
      console.log('Images selected:', images)
      images.forEach((img, i) => {
        if (img) {
          console.log(`Image ${i+1}:`, img.name, img.size)
          formData.append(`image${i+1}`, img)
        }
      })

      const token = localStorage.getItem('adminToken')
      console.log('Token:', token ? 'Present' : 'Missing')

      const response = await fetch('http://localhost:4000/api/product/add', {
        method: 'POST',
        headers: {
          'token': token
        },
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        alert('Product added successfully!')
        navigate('/')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Error adding product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Add New Product</h1>
      
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Basic Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Product Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Price</label>
            <input
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-full p-2 border rounded'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium mb-1'>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full p-2 border rounded h-24'
            required
          />
        </div>

        {/* Category */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full p-2 border rounded'
            >
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Sub Category</label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className='w-full p-2 border rounded'
            >
              <option value='Topwear'>Topwear</option>
              <option value='Bottomwear'>Bottomwear</option>
              <option value='Winterwear'>Winterwear</option>
            </select>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label className='block text-sm font-medium mb-2'>Sizes</label>
          <div className='flex gap-2'>
            {sizeOptions.map((size) => (
              <button
                key={size}
                type='button'
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-2 border rounded ${
                  sizes.includes(size) ? 'bg-black text-white' : 'bg-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
            />
            <span className='text-sm font-medium'>Bestseller</span>
          </label>
        </div>

        {/* Images */}
        <div>
          <label className='block text-sm font-medium mb-2'>Product Images (Max 4)</label>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className='border-2 border-dashed rounded-lg p-4 text-center'>
                {images[index] ? (
                  <div className='relative'>
                    <img
                      src={URL.createObjectURL(images[index])}
                      alt={`Preview ${index + 1}`}
                      className='w-full h-24 object-cover rounded'
                    />
                    <button
                      type='button'
                      onClick={() => {
                        const newImages = [...images]
                        newImages[index] = null
                        setImages(newImages)
                      }}
                      className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-sm'
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <span className='text-3xl text-gray-400'>+</span>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={(e) => handleImageChange(e, index)}
                      className='hidden'
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={loading}
          className='w-full bg-black text-white py-3 rounded hover:bg-gray-800 disabled:opacity-50'
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  )
}

export default AddProduct