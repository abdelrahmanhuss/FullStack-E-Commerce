import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import axios from "axios"

const Login = () => {
  const navigate = useNavigate()
  const {url,setToken,loadCartData} = useContext(ShopContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setFormData((data)=>({...data, [name]: value}))
  }

  const onLogin = async(event)=>{
    event.preventDefault()

    try{
      const response = await axios.post(`${url}/users/login`,formData)

      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token" , response.data.token)
        await loadCartData(response.data.token)
        navigate("/")
      }else{
        alert(response.data.message)
      }
    }catch(err){
      alert("Error")
    }
  }

  return (
    <section className=' relative w-full min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm p-10 shadow-2xl pointer-events-none'>
      </div>
      <div className=' relative z-10 max-w-md w-full bg-white/10 shadow-2xl border border-white/20 backdrop-blur-md p-10 rounded-2xl'>
      <h2 className='text-3xl sm:text-4xl font-extrabold mb-6 text-center'>Login</h2>
      <form onSubmit={onLogin} className='flex flex-col gap-6'>
        <input type='email' name='email' placeholder='Email' value={formData.email} onChange={onChangeHandler} required className=' bg-white/30 p-4 rounded-xl text-black placeholder-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all' />
        <input type='password' name='password' placeholder='Password' value={formData.password} onChange={onChangeHandler} required className=' bg-white/30 p-4 rounded-xl text-black placeholder-gray-300 font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all' />
        <button type='submit' className=' bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-2xl text-white font-semibold hover:opacity-90 shadow-lg transition-all'>Sign In</button>
     </form>
      <p className=' text-center text-gray-300 mt-6'>Don't have an account? <span onClick={()=>navigate("/signup")} className=' text-cyan-400 font-semibold cursor-pointer hover:underline'>Create New Account</span></p>
      </div>
    </section>
  )
}

export default Login