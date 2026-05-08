import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
const Product = () => {
  const { productId } = useParams()
  const { addToCart,all_products,url } = useContext(ShopContext)
  const product = all_products.find((product) => product.id === productId)

  const [ selectedColor, setSelectedColor ] = useState("Red")
  const [ selectedSize, setSelectedSize ] = useState("M")
  const [ quantity, setQuantity ] = useState(1)

  if (!product) {
    return (
      <section className=' w-full min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10'>
        <p className=' text-2xl font-bold'>Product not found</p>
      </section>
    )
  }
  const handleAddToCart = () => {
    addToCart(productId, quantity)
    alert(`${quantity} ${product.name}(s) added to cart!`)
  }
  return (
    <section className=' w-full min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10'>
      <div className=' max-w-6xl mx-auto w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col md:flex-row gap-10 p-10'>

        <div className=' md:w-1/2 bg-white/5 flex items-center justify-center rounded-3xl p-6'>
          <img src={`${url}/images/${product.image}`} alt={product.name} className=' w-64 h-64 object-contain rounded-2xl' />
        </div>

        <div className=' flex-1 flex flex-col gap-6'>
          <h2 className=' text-4xl font-extrabold'>{product.name}</h2>
          <p className=' text-gray-300 text-lg'>{product.description}</p>
          <p className=' text-3xl text-cyan-400 font-bold'>${product.price}</p>
          <p className=' text-lg text-gray-200'>{product.category}</p>
          <div className=' flex items-center gap-4'>
            <h4 className=' mb-2 font-semibold'>Color:</h4>
            <div className=' flex gap-4'>
              {["Red", "Blue", "Green", "Black", "White"].map((color) => (
                <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 border-white transition-all ${color === "White" ? "bg-white": color=== "Black" ? "bg-black"  : `bg-${color.toLowerCase()}-500`} ${selectedColor === color ? " scale-125 ring-2 ring-cyan-500" : ""}`} >
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className=' mb-2 font-semibold'>Size:</h4>
            <div className='  flex gap-4'>
              {["S", "M", "L", "XL"].map((size) => (
                <button
                key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl border-2 border-white transition-all ${selectedSize === size ? "bg-cyan-500 text-black scale-105" : ""}`}
                  >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className=' flex items-center gap-4'>
            <h4 className=' font-semibold'>Quantity:</h4>
            <div className=' flex items-center gap-4'>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className='bg-white/20 px-3 py-1 hover:bg-white/30 p-2 rounded-xl transition-all'>
                -
              </button>
              <span className='px-3'>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className='bg-white/20 px-3 py-1 hover:bg-white/30 p-2 rounded-xl transition-all'>
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className=' w-full md:w-auto bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-3 rounded-2xl text-white hover:opacity-90 transition-all'>Add to Cart</button>
          </div>
        </div>
        </div>
    </section>
  )
}

export default Product
