import { useContext } from 'react'
import { Home, FolderOpen, Mail, User,ShoppingBag, ShoppingCart } from 'lucide-react'
import { useNavigate,useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { ShopContext } from '../context/ShopContext'

const menuItemsData = [
  { to: 'home', label: 'Home', Icon:Home },
  { to: 'categories', label: 'Categories', Icon:FolderOpen },
  { to:'shop', label: 'Shop', Icon:ShoppingBag },
  { to: 'contact', label: 'Contact', Icon:Mail },
];

const MenuItems = ({ setSideBarOpen, isMobile }) => {

  const { cartItems, token, isAdmin, logout } = useContext(ShopContext);


  const location = useLocation();
  const totalItems = Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
    setSideBarOpen && setSideBarOpen(false);
  }


  return (
    <div className={`flex md:justify-center lg:justify-end ${isMobile ? 'flex-col space-y-6 items-center px-4 gap-y-2': 'flex-row w-full items-center gap-4'}`}>
      {
        menuItemsData.map(({to,label,Icon}) => location.pathname === '/' ?
        (
          <ScrollLink key={to} to={to} smooth={true}
          duration={500} offset={-80} spy={true} 
          className='flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer h-9 transition-all shrink-0 w-auto min-w-20 text-gray-200 hover:bg-white/10 hover:text-white hover:shadow-md '
          activeClass='bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg'
          onClick={() => setSideBarOpen && setSideBarOpen(false)}>
            <Icon className='w-6 h-6' />
            <span className='font-semibold text-base'>{label}</span>
          </ScrollLink>
        ):
        (
          <button key={to} onClick={() => {navigate('/'); setSideBarOpen && setSideBarOpen(false) }} className='flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer h-9 transition-all shrink-0 w-auto min-w-20 text-gray-200 hover:bg-white/10 hover:text-white hover:shadow-md '>
            <Icon className='w-6 h-6' />
            <span className='font-semibold text-base'>{label}</span>
          </button>
        )

      )
      }
      <button onClick={() => {navigate('/cart'); setSideBarOpen && setSideBarOpen(false) }} className='relative flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer h-9 transition-all text-gray-200 hover:bg-white/10 hover:text-white hover:shadow-md '>
        <ShoppingCart className='w-6 h-6' />
        {/* <span className='font-semibold text-base'>Cart</span> */}
        {totalItems > 0 && (
          <span className='absolute -top-1 -right-1 font-bold bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
            {totalItems}
          </span>
        )}
      </button>

        {!token ? (
          <button onClick={() => {navigate('/login'); setSideBarOpen && setSideBarOpen(false) }} className='flex items-center gap-2 px-4 py-3 rounded-lg h-9 bg-cyan-400 transition-all text-white font-semibold hover:bg-cyan-500 '>
            Login
          </button>
        ) : (
          <div className='flex items-center gap-4'>
            {isAdmin && (
              <button onClick={() => {navigate('/admin/list'); setSideBarOpen && setSideBarOpen(false)}} className='flex items-center gap-2 px-4 py-3 rounded-lg h-9 bg-cyan-500 transition-all text-white font-semibold hover:bg-cyan-600 '>
                Admin
              </button>
            )}
            <button onClick={handleLogout} className='flex items-center gap-2 px-4 py-3 rounded-lg h-9 bg-red-500 transition-all text-white font-semibold hover:bg-red-600 '>
              Log Out
            </button>
          </div>
        )}
    </div>
  )
}

export default MenuItems;