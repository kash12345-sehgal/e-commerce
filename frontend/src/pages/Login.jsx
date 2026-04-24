
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const[currentSate , setCurrentState]= useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currentSate === 'Admin Login') {
        const response = await fetch('http://localhost:4000/api/user/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        
        if (data.success) {
          localStorage.setItem('adminToken', data.token)
          alert('Admin login successful!')
          navigate('/add-product')
        } else {
          alert(data.message)
        }
      } else {
        alert('Regular user login not implemented yet')
      }
    } catch (error) {
      console.error(error)
      alert('Error during login')
    }
  }
  return (
    <form  onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max:w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentSate}</p>
<hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentSate=== 'Login'? '':<input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name'required/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentSate==='Login'
          ? <p onClick={()=>setCurrentState('Admin Login')} className='cursor-pointer text-blue-600'>Admin Login</p>
         : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Back to User Login</p>
        }
      </div>
    <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentSate  ===  'Login'?'Sign In': 'Admin Login'}</button>
    </form>
  )
}

export default Login