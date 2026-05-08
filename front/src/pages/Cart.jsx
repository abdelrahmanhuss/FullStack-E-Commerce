import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItems, all_products,addToCart, removeFromCart, getTotalCartAmount,url } = useContext(ShopContext);
  const navigate = useNavigate();
  const totalAmount = getTotalCartAmount();

  const cartProducts = Object.keys(cartItems).map((itemId) => {
  const product = all_products.find((p) => p.id === itemId);
  return { ...product, quantity: cartItems[itemId] };
  });
  
return (
    <section className='relative w-full min-h-screen flex items-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10'>
      <div className='absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-none'>

      </div>
      <div className='relative z-10 max-w-6xl mx-auto'>
        <h2 className='text-4xl sm:text-5xl font-semibold mb-10 text-center'>Your Cart</h2>
        {cartProducts.length === 0 ? (
          <div className=' text-center text-gray-300'>
            <p className='text-xl text-gray-300 m-4'>Your cart is empty. Start shopping now!</p>
            <button onClick={()=>navigate("/")} className=' bg-linear-to-r from-cyan-500 to-blue-500 px-8 py-3 rounded-2xl text-white hover:opacity-90 transition-all'>
              Shop Now
            </button>
          </div>
        ) : (
          <>
          <div className='space-y-6 mb-12'>
            {cartProducts.map((product) => (
              <div key={product.id} className='flex flex-col sm:flex-row items-center justify-between bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-3xl hover:shadow-cyan-400/30 transition-all'>
                  <div className='flex items-center gap-6'>
                    <img src={`${url}/images/${product.image}`} alt={product.name} className='w-24 h-24 object-contain rounded-xl'/>
                    <div>
                      <h3 className=' text-xl font-semibold'>{product.name}</h3>
                      <p className='text-sm mt-1 line-clamp-1 text-gray-300'>{product.description}</p>
                      <p className='text-lg text-cyan-400 font-bold mt-2'>{product.price}</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4 mt-6 sm:mt-10'>
                    <button onClick={() => removeFromCart(product.id)} className='bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all'>
                      <Minus className='w-5 h-5' />
                    </button>
                    <span className='text-lg font-semibold'>{product.quantity}</span>
                    <button onClick={() => addToCart(product.id)} className='bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all'>
                      <Plus className='w-5 h-5' />
                    </button>
                    <button onClick={() => removeFromCart(product.id, true)} className='bg-red-500/70 hover:bg-red-600 p-2 rounded-full transition-all ml-4'>
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
              </div>
            ))}
          </div>
          <div className=' bg-white/10 border border-white/20 backdrop-blur-md p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6'>
            <div className='text-2xl font-bold'>
              Total: <span className='text-cyan-400 ml-3'>${totalAmount.toFixed(2)}</span><br />
            </div>
            <button onClick={() => navigate('/order')} className=' flex items-center justify-center gap-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-8 py-4 rounded-2xl text-white font-semibold shadow-lg hover:opacity-90 transition-all sm:w-auto w-full'>
              <ShoppingBag className='w-5 h-5 ' />
              Proceed to Checkout
            </button>
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart
