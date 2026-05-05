import { useState, useContext } from 'react'
import { categories } from "../assets/data";
import { ShoppingBag } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from 'react-router-dom';
const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart,url,all_products } = useContext(ShopContext);
  const navigate = useNavigate();

  const filteredProducts = Array.isArray(all_products) ? (selectedCategory === "All" ? all_products : all_products.filter(product => product.category === selectedCategory)) : [];

  return (
    <section className=' relative w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-18'>
      <div className='absolute inset-0 bg-black/30  backdrop-blur-sm'>
      </div>
      <div className='relative z-10 max-w-7xl mx-auto text-center'>
        <h2 className='text-5xl font-extrabold mb-12'>Shop by Category</h2>
        <div className='flex justify-center gap-6 mb-16 flex-wrap'>
          <button onClick={() => setSelectedCategory("All")} className={`px-6 py-3 rounded-2xl text-lg font-semibold transition-all shadow-lg ${selectedCategory === "All" ? "bg-linear-to-r from-cyan-400 to-blue-500 text-white shadow-cyan-400/50 scale-105" : "bg-white/10 text-gray-200 hover:bg-white/20"}`}>
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-2xl text-lg font-semibold transition-all shadow-lg ${selectedCategory === category.name ? "bg-linear-to-r from-cyan-400 to-blue-500 text-white shadow-cyan-400/50 scale-105" : "bg-white/10 text-gray-200 hover:bg-white/20"}`}
            >
              {category.name}
            </button>
          ))}
          <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            {filteredProducts.map((product) => (
              <div onClick={() => navigate(`/products/${product.id}`)} key={product.id} className='bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:scale-105 hover:shadow-cyan-400/30 hover:bg-white/20 transition-all duration-500'>
                <div className=' relative w-full h-64 flex items-center justify-center bg-linear-to-b from-purple-800/40 to-transparent'>
                  <img src={`${url}/images/${product.image}`} alt={product.name} className='w-56 h-56 object-contain hover:scale-105 transition-transform duration-500' />
                </div>
                <div className='p-5 text-left'>
                  <h3 className='text-lg font-semibold mb-2'>{product.name}</h3>
                  <p className='text-gray-300 text-sm mb-4 line-clamp-2'>${product.description}</p>
                  <div className='flex items-center justify-between'>
                    <span className='text-xl font-bold text-cyan-400'>${product.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(product.id)} className='bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all flex items-center gap-2'>
                      <ShoppingBag className='w-5 h-5' /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Categories
