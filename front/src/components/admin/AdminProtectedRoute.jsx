import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'

const AdminProtectedRoute = ({ children }) => {
  const { token, isAdmin } = useContext(ShopContext)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminProtectedRoute
