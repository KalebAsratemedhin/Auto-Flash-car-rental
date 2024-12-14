import React, { useState } from 'react'

const Notification = () => {
    const [notifications] = useState([
        { id: 1, text: 'Your rental for BMW X5 is due tomorrow', isNew: true },
        { id: 2, text: 'Special offer: 20% off on weekend rentals', isNew: true },
        { id: 3, text: 'Welcome to CarRental!', isNew: false },
      ]);
    
      const [showNotifications, setShowNotifications] = useState(false);

    return (
        <div className="flex items-center space-x-4">
            <div className='relative'>
                <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {notifications.some(n => n.isNew) && (
                    <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                    )}
                </button>
            </div>
            
    
            {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
                {notifications.map(notification => (
                    <div
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-gray-50 ${notification.isNew ? 'bg-indigo-50' : ''}`}
                    >
                    <p className="text-sm text-gray-800">{notification.text}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
  
}

export default Notification;