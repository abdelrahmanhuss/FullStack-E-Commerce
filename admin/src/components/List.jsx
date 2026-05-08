import { useState, useEffect } from 'react'
import { Trash2 } from "lucide-react"
import axios from "axios"

const List = () => {
  const [products, setProducts] = useState([]);
  const url = 'http://localhost:4000';
  const fetchProducts = async () => {
    const response = await axios.get(`${url}/products/list`);
    if (response.data.success) {
      setProducts(response.data.data);
    } else {
      alert(response.data.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete(`${url}/products/${id}`);
    if (response.data.success) {
      fetchProducts();
    } else {
      alert(response.data.message);
    }
  }

  return (
    <section className='relative md:ml-64 w-full min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10'>
      <div className=' relative z-10 max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-center'>Products</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {products.map((product) => (
            <div key={product.id} className='bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col justify-between shadow-lg'>
              <img src={`${url}/images/${product.image}`} alt={product.name} className='w-full h-48 object-contain mb-4 rounded-xl' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-sm text-gray-400 mb-2 truncate'>{product.description}</p>
              <p className='font-bold mb-2 text-cyan-300'>${product.price}</p>
              <p className='text-gray-200 mb-4'>{product.category}</p>
              <button onClick={() => handleDelete(product.id)} className=' bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hovor:bg-red-600 transition-all'>
                <Trash2 className='w-5 h-5' /> Delete
              </button>
            </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default List;
