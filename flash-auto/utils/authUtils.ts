'use client'

// import { useDispatch } from 'react-redux';
import {getAuth} from '@/redux/slices/authSlice'
export const isLoggedIn = () => {
    const token = localStorage.getItem('accessToken');
    // const dispatch = useDispatch()

    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); 
    console.log('token payload', payload)

      const isExpired = payload.exp * 1000 < Date.now();
    console.log('token payload is expired', isExpired)



      return !isExpired;
    } catch (error) {
      console.error('Invalid token:', error);
      return false;
    }
  };
  