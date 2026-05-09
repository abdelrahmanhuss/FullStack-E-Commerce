import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Verify from './pages/Verify'
import MyOrders from './pages/MyOrders'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './pages/Home'
import Header from './components/Header'
import ShopContextProvider, { ShopContext } from './context/ShopContext'
import Featuers from './components/Featuers'
import Categories from './components/Categories'
import AdminSidebar from './components/admin/Sidebar'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'
import Add from './components/admin/Add'
import List from './components/admin/List'
import Orders from './components/admin/Orders'
import Users from './components/admin/Users'
import Notifications from './components/admin/Notifications'
import { Toaster } from 'react-hot-toast'

const AppRoutes = () => {
  const { isAdmin } = useContext(ShopContext)

  return (
    <>
    <Toaster />
      
      <Header />
      {isAdmin && <AdminSidebar />}
      <div className={isAdmin ? 'pt-12 lg:pl-64' : 'pt-12'}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:productId' element={<Product />} />
          <Route path='cart' element={<Cart />} />
          <Route path='shop' element={<Categories />} />
          <Route path='categories' element={<Categories />} />
          <Route path='order' element={<Order />} />
          <Route path='verify' element={<Verify />} />
          <Route path='myorders' element={<MyOrders />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />

          <Route path='/admin' element={<Navigate to='/admin/list' replace />} />
          <Route path='/admin/login' element={<Navigate to='/login' replace />} />
          <Route path='/admin/add' element={<AdminProtectedRoute><Add /></AdminProtectedRoute>} />
          <Route path='/admin/list' element={<AdminProtectedRoute><List /></AdminProtectedRoute>} />
          <Route path='/admin/orders' element={<AdminProtectedRoute><Orders /></AdminProtectedRoute>} />
          <Route path='/admin/users' element={<AdminProtectedRoute><Users /></AdminProtectedRoute>} />
          <Route path='/admin/notifications' element={<AdminProtectedRoute><Notifications /></AdminProtectedRoute>} />
        </Routes>
      </div>
    </>
  )
}

const App = () => {
  return (
    <ShopContextProvider>
      <AppRoutes />
    </ShopContextProvider>
  )
}

export default App
