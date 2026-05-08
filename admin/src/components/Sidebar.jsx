import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  PlusCircle,
  List,
  ClipboardCheck,
  Menu,
  X,
  LogOut,
  Users
} from 'lucide-react'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const menuItems = [
    {
      to: "/admin/add",
      label: "Add Product",
      Icon: PlusCircle
    },
    {
      to: "/admin/list",
      label: "Products List",
      Icon: List
    },
    {
      to: "/admin/orders",
      label: "Customers Orders",
      Icon: ClipboardCheck
    },
    {
      to: "/admin/users",
      label: "Manage Users",
      Icon: Users
    }
  ]

  const handleLogOut = () => {
    localStorage.removeItem("adminToken")
    navigate("/admin/login")
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 p-3 rounded-xl text-white shadow-lg transition-transform duration-300 hover:scale-105'
      >
        {isOpen ? (
          <X className='w-5 h-5' />
        ) : (
          <Menu className='w-5 h-5' />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-linear-to-b from-indigo-900 via-purple-900 to-pink-900
          text-white shadow-lg z-40
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className='flex flex-col h-full justify-between py-10 px-6'>
          
          {/* Top Section */}
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-center mb-6'>
              Admin Panel
            </h2>

            {menuItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-linear-to-r from-cyan-400 to-blue-500 text-white shadow-lg scale-105"
                      : "hover:bg-white/10 hover:shadow-md text-gray-200"
                  }
                `}
              >
                <Icon className='w-5 h-5' />
                <span className='font-semibold'>{label}</span>
              </NavLink>
            ))}
          </div>

          {/* Bottom Section */}
          <button
            onClick={handleLogOut}
            className='flex items-center justify-center gap-2 mt-6 w-full px-4 py-3 bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-300'
          >
            <LogOut className='w-5 h-5' />
            <span className='font-semibold'>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar