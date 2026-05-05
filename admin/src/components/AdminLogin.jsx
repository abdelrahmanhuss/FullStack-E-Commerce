import  { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
      const url = 'http://localhost:4000/admin/login'


      useEffect(()=>{
        const token = localStorage.getItem("adminToken");
        if(token){
          navigate('/admin/list')
        }
      },[navigate])

      const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
          const {data}= await axios.post(url,{email,password})
          if(data.success){
            localStorage.setItem('adminToken',data.token)
            navigate('/admin/list')
          }else{
            console.log(data.message);
            
          }
        }catch(err){
          console.log(err);
          
        }
      }

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 overflow-hidden'>
      <div className=' absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 top-20 left-20 animate-pulse'>
      </div>
      <div className=' absolute w-72 h-72 bg-indigo-500 rounded-full blur-3xl opacity-20 bottom-20 right-20 animate-pulse'>
      </div>
      <form className='relative z-10 w-96 bg-white/10 shadow-2xl border border-white/20 backdrop-blur-xl p-8 rounded-2xl flex flex-col items-center transition-all duration-300 hovor:scale-[1.02]'>
        <h2 className='text-3xl font-bold mb-6 text-center text-white'>Admin Login</h2>
        <input type='email' name='email' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white' required />
        <input type='password' name='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-white' required />
        <button type='submit' onSubmit={()=>handleSubmit} className='w-full bg-linear-to-r from-indego-600 via-purple-600 to-pink-500 p-3 rounded-lg text-white font-semibold hover:shadow-pink-500/30 hover:scale-[1.03] shadow-lg transition-all duration-300'>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin