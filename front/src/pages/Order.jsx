import { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const Order = () => {

  const { cartItems,all_products, getTotalCartAmount,url,token } = useContext(ShopContext)
  const navigate = useNavigate()
  const totalAmount = getTotalCartAmount()

  const cartProducts = Object.keys(cartItems).map((itemId) => {
    const product = all_products.find((product) => product.id === itemId);
    if (product) {
      return { ...product, quantity: cartItems[itemId] };
    }
    return null;
  }).filter(Boolean);

  const [shipping, setShipping] = useState({
    name: '',
    address: '', 
    city: '',
    phone: ''
  })
  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value })
  };
  const placeOrder = async (e) => {
    e.preventDefault()
    if (!shipping.name || !shipping.address || !shipping.city || !shipping.phone) {
      alert('Please fill in all shipping details.')
      return
    }

    const orderItems = cartProducts.map((product) => ({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    }))

    const orderData = {
      address: shipping,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    }

    try {
      const response = await axios.post(`${url}/orders/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success && response.data.checkoutUrl) {
        window.location.replace(response.data.checkoutUrl)
      } else {
        alert(response.data.message || 'Error placing order')
      }
    } catch (err) {
      console.log(err)
      alert('Error placing order')
    }
  }

  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount() === 0){
      navigate("cart")
    }
  },[token])
  return (
    <section className=' relative w-full min-h-screen flex items-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'>

      </div>


      <div className='relative z-10 max-w-5xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl font-extrabold mb-12 text-center'>Confirm Your Order</h2>
        {
          cartProducts.length === 0 ? (
            <div className=' text-center text-gray-300 mt-20 space-y-6'>
              <p className='text-xl'>Your cart is empty.</p>
              <button onClick={()=>navigate("/")} className=' bg-linear-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-2xl text-white font-semibold hover:opacity-90 transition-all'>Continue Shopping</button>
            </div>
          ):(
            <div className=' grid md:grid-cols-2 gap-10'>
              <div className=' space-y-6'>
                {cartProducts.map((product) => (
                  <div key={product.id} className='flex items-center gap-4 bg-white/10 shadow-lg border border-white/20 backdrop-blur-md p-4 rounded-2xl'>
                    <img src={`${url}/images/${product.image}`} alt={product.name} className='w-20 h-20 object-contain rounded-xl'/>
                    <div>
                      <h3 className='text-lg font-semibold'>{product.name}</h3>
                      <p className='text-sm text-gray-300'>Quantity: {product.quantity}</p>
                      <p className=' text-cyan-400 font-bold'>${(product.price).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              <div className='text-xl font-bold mt-6'>
                Total Amount: <span className='text-cyan-400 ml-2'>${totalAmount.toFixed(2)}</span>
              </div>
              </div>
              
              <div className=' bg-white/10 p-8 rounded-3xl backdrop-blur-md border border-white/20 shadow-xl'>
                <h3 className='text-2xl font-semibold mb-6 text-center'>Shipping Details</h3>
                <div className='space-y-4'>
                  <form onSubmit={placeOrder}>

                  <input type="text" name="name" placeholder='Full Name' value={shipping.name} onChange={handleChange} className='w-full px-4 py-3 rounded-xl bg-white/15 placeholder-gray-300 border border-white/30 text-white outline-none focus:ring-2 focus:ring-cyan-400' />
                  <input type="text" name="address" placeholder='Address' value={shipping.address} onChange={handleChange} className='w-full px-4 py-3 rounded-xl bg-white/15 placeholder-gray-300 border border-white/30 text-white outline-none focus:ring-2 focus:ring-cyan-400' />
                  <input type="text" name="city" placeholder='City' value={shipping.city} onChange={handleChange} className='w-full px-4 py-3 rounded-xl bg-white/15 placeholder-gray-300 border border-white/30 text-white outline-none focus:ring-2 focus:ring-cyan-400' />
                  <input type="text" name="phone" placeholder='Phone Number' value={shipping.phone} onChange={handleChange} className='w-full px-4 py-3 rounded-xl bg-white/15 placeholder-gray-300 border border-white/30 text-white outline-none focus:ring-2 focus:ring-cyan-400' />
                  <button type='submit' className='w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 py-4 rounded-xl text-white font-semibold shadow-lg hover:opacity-90 transition-all mt-4'>
                    Confirm Order
                  </button>
                  </form>
                </div>
              </div>
              </div>
            )
          }
      </div>
    </section>
  )
}

export default Order
