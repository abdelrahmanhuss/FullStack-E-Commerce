import { useEffect, useState, useContext } from 'react'
import { Trash2, Shield, User } from 'lucide-react'
import axios from 'axios'
import { ShopContext } from '../../context/ShopContext'

const Users = () => {
  const { url, token } = useContext(ShopContext)

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/users/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        setUsers(response.data.data || [])
      } else {
        setUsers([])
      }
    } catch (error) {
      console.log(error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const makeAdmin = async (userId) => {
    try {
      const response = await axios.post(
        `${url}/users/make-admin/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId
              ? { ...user, role: 'ADMIN' }
              : user
          )
        )

        alert('User promoted successfully')
      }
    } catch (error) {
      console.log(error)
      alert('Failed to promote user')
    }
  }

  const demoteToUser = async (userId) => {
    try {
      const response = await axios.post(
        `${url}/users/demote/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId
              ? { ...user, role: 'USER' }
              : user
          )
        )

        alert('User demoted successfully')
      }
    } catch (error) {
      console.log(error)
      alert('Failed to demote user')
    }
  }

  const deleteUser = async (userId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    )

    if (!confirmed) return

    try {
      const response = await axios.delete(
        `${url}/users/delete/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.success) {
        setUsers((prev) =>
          prev.filter((user) => user.id !== userId)
        )

        alert('User deleted successfully')
      }
    } catch (error) {
      console.log(error)
      alert('Failed to delete user')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <section className=' min-h-screen flex items-center justify-center bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white'>
        <h2 className='text-2xl font-semibold'>
          Loading users...
        </h2>
      </section>
    )
  }

  return (
    <section className=' min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10'>
      <div className='max-w-6xl mx-auto'>

        <h1 className='text-4xl sm:text-5xl font-extrabold mb-12 text-center'>
          Manage Users
        </h1>

        {users.length === 0 ? (
          <div className='text-center text-gray-300 text-lg'>
            No users found
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

            {users.map((user) => (
              <div
                key={user.id}
                className='bg-white/10 border border-white/20 backdrop-blur-md p-6 rounded-3xl shadow-lg flex flex-col items-center text-center hover:shadow-indigo-500/40 transition-all'
              >

                <div className='w-20 h-20 rounded-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mb-4 overflow-hidden'>

                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <User className='w-10 h-10 text-white' />
                  )}

                </div>

                <h3 className='text-xl font-bold'>
                  {user.name}
                </h3>

                <p className='text-gray-300 text-sm mb-3'>
                  {user.email}
                </p>

                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold mb-4 flex items-center gap-1 ${
                    user.role === 'ADMIN'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-cyan-500 text-white'
                  }`}
                >
                  {user.role === 'ADMIN' && (
                    <Shield className='w-4 h-4' />
                  )}

                  {user.role === 'ADMIN'
                    ? 'Admin'
                    : 'User'}
                </div>

                <button
                  onClick={() => deleteUser(user.id)}
                  disabled={user.role === 'ADMIN'}
                  className={`flex items-center gap-2 transition-all px-4 py-2 mb-2 rounded-lg text-sm font-semibold ${
                    user.role === 'ADMIN'
                      ? 'bg-gray-500/40 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  <Trash2 className='w-5 h-5' />
                  Delete
                </button>

                <button
                  onClick={() =>
                    user.role === 'ADMIN'
                      ? demoteToUser(user.id)
                      : makeAdmin(user.id)
                  }
                  className={`flex items-center gap-2 transition-all px-4 py-2 rounded-lg text-sm font-semibold ${
                    user.role === 'ADMIN'
                      ? 'bg-orange-500 hover:bg-orange-600'
                      : 'bg-yellow-500 hover:bg-yellow-600'
                  }`}
                >
                  {user.role === 'ADMIN' ? (
                    <Shield className='w-4 h-4' />
                  ) : (
                    <User className='w-4 h-4' />
                  )}

                  {user.role === 'ADMIN'
                    ? 'Demote to User'
                    : 'Promote to Admin'}
                </button>

              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  )
}

export default Users
