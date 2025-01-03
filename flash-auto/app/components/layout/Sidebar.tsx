'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCompass, FiHeart, FiCalendar, FiMessageCircle, FiSettings, FiPlusCircle } from 'react-icons/fi';
import Logo from './Header/Logo';
import { useDispatch } from  'react-redux';
import { clearAuth } from '@/redux/slices/authSlice';

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const menuItems = [
    { icon: FiHome, label: 'Home', href: '/' },
    { icon: FiCompass, label: 'Discover', href: '/discover' },
    { icon: FiHeart, label: 'Favorites', href: '/favorites' },
    { icon: FiCalendar, label: 'My Rentals', href: '/rent' },
    { icon: FiSettings, label: 'Settings', href: '/settings' },
  ];

  return (
    <div className="w-[250px] px-8 py-4  bg-white">
      <Logo />
      
      <Link
        href="/post"
        className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FiPlusCircle size={20} />
        <span className="font-medium">Post a Car</span>
      </Link>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}

        <button className='flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50' onClick={() => dispatch(clearAuth())}>Signout</button>
      </nav>

      <div className="">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900">Need Help?</h3>
          <p className="text-sm text-blue-700 mt-1">
            Contact our support team for assistance.
          </p>
          <Link
            href="/support"
            className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Get Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
