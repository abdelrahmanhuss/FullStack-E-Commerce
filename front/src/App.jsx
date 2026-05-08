import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Verify from './pages/Verify'
import MyOrders from './pages/MyOrders'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './pages/Home'
import Header from './components/Header'
import ShopContextProvider from './context/ShopContext'
import Featuers from './components/Featuers'
import Categories from './components/Categories'

const App = () => {
  return (
    <ShopContextProvider>
  <Header />
  
  <div className="pt-12">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/products/:productId' element={<Product />} />
      <Route path="cart" element={<Cart />} />
      <Route path="shop" element={<Categories />} />
      <Route path="categories" element={<Categories />} />
      <Route path="order" element={<Order />} />
      <Route path="verify" element={<Verify />} />
      <Route path="myorders" element={<MyOrders />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  </div>
</ShopContextProvider>
  )
}

export default App
