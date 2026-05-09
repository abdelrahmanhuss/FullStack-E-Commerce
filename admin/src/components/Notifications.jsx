import { useEffect, useState } from 'react'
import axios from 'axios'
import { Bell, Trash2, CheckCircle } from 'lucide-react'

const Notifications = () => {
    const url = 'http://localhost:4000';
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${url}/notifications/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotifications(response.data.data || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };
    const markAsRead = async (id) => {
            await axios.patch(`${url}/notifications/read/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.id === id ? { ...notification, isRead: true } : notification
                )
            );
    };

    const deleteNotification = async (id) => {
            await axios.delete(`${url}/notifications/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    };
    const clearAllNotifications = async () => {
            await axios.delete(`${url}/notifications/clear`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNotifications([]);
        }
    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <section className=" lg:ml-64 min-h-screen bg-linear-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 px-6 sm:px-10">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-4xl font-extrabold flex items-center gap-3">
                        <Bell className=" w-8 h-8 text-cyan-400" />
                        Notifications
                    </h2>
                    { notifications.length > 0 && (<button
                        onClick={clearAllNotifications}
                        className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-semibold"
                    >
                        Clear All
                    </button>)}
                </div>
                {loading ? (
                    <div className="text-center text-gray-400">
                        <p>Loading notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="text-center text-gray-400">
                        <p>No notifications to display.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div key={notification.id} className={`bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20 flex justify-between items-center transition-all ${
                                notification.isRead ? 'opacity-60' : ' shadow-lg shadow-cyan-500/20'
                            }`}>
                                <div>
                                    <p className="text-lg font-semibold">{notification.message}</p>
                                    <p className="text-sm text-gray-300">{new Date(notification.createdAt).toLocaleString()}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {!notification.isRead && (
                                        <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="text-cyan-600 hover:text-cyan-700 p-2 rounded-full"
                                        >
                                            <CheckCircle className=" w-5 h-5" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => deleteNotification(notification.id)}
                                        className="text-red-600 hover:text-red-700 p-2 rounded-full"
                                    >
                                        <Trash2 className=" w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Notifications
