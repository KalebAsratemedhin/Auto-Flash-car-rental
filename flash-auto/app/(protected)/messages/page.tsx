'use client'
import { useState } from 'react';
import { FiSearch, FiMoreVertical } from 'react-icons/fi';

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    sender: {
      name: 'John Doe',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe',
    },
    lastMessage: 'Is the car still available for next week?',
    timestamp: '2:30 PM',
    unread: true,
  },
  {
    id: '2',
    sender: {
      name: 'Jane Smith',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith',
    },
    lastMessage: 'Great! I willl pick up the car at 3 PM',
    timestamp: 'Yesterday',
    unread: false,
  },
];

const MessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-sm min-h-screen">
        <div className="border-b">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="divide-y">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-gray-50 cursor-pointer ${
                message.unread ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center">
                <img
                  src={message.sender.avatar}
                  alt={message.sender.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {message.sender.name}
                      </h3>
                      <p className={`text-sm ${
                        message.unread ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}>
                        {message.lastMessage}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                      <button className="ml-4 text-gray-400 hover:text-gray-600">
                        <FiMoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {mockMessages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
              <p className="text-gray-500">Your messages will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
