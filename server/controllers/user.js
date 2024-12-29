import Rent from '../models/rent.js'
import User from '../models/user.js'
import Car from '../models/car.js'
import mongoose from 'mongoose'
import { getUserSummary, getAdminSummary, getSuperAdminSummary } from '../utils/summary.js'
import { getUserAnalytics, getAdminAnalytics, getSuperAdminAnalytics } from '../utils/analytics.js'


export const getSummary = async(req, res) => {
    try {
        
        const {id} = req.params
        const user = await User.findById(id)
 
        if (!user){
          return res.error('User not found', 404)
        }

        let data;
        
        if(user.role === 'user'){
          data = await getUserSummary(user._id)
        }
      
        if(user.role === 'admin'){
          data = await getAdminSummary(user._id)
        }

        if(user.role === 'super-admin'){
          data = await getSuperAdminSummary(user._id)
        }

        if(!data){
          res.error('User summary could not be fetched successfully.', 404)
        }
      
        res.success("User summary fetched successfully.", 200, data)

        
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);        
    }
}

export const getAnalytics = async(req, res) => {
  try {
      
    const {id} = req.params
    const user = await User.findById(id)

    if (!user){
      return res.error('User not found', 404)
    }

    let data;
    
    if(user.role === 'user'){
      data = await getUserAnalytics(user._id)
      console.log('user analytic', data)
    }
  
    if(user.role === 'admin'){
      data = await getAdminAnalytics(user._id)
    }

    if(user.role === 'super-admin'){
      data = await getSuperAdminAnalytics(user._id)
    }

    if(!data){
      return res.error('User summary could not be fetched successfully.', 404)
    }

    res.success("User summary fetched successfully.", 200, data)

      
  } catch (error) {
      res.error('Internal server error.', 500, [error.message]);        
  }
}


export const getCurrentUser =  async(req, res) => {
    try {
        console.log('curr user', req.user)
        const {id} = req.user
        const user = await User.findById(id)

        res.success("Current user found.", 200, user.toObject())

        
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);
        
    }
}

export const getAllUsers =  async(req, res) => {
  try {
      const users = await User.find()
      console.log('users', users)


      res.success("List of all users", 200, users)

      
  } catch (error) {
      res.error('Internal server error.', 500, [error.message]);
      
  }
}



export const getUserById =  async(req, res) => {
    try {

        const {id} = req.params
        const user = await User.findById(id)

        res.success("User found.", 200, user.toObject())

        
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);        
    }
}

export const updateUserProfile = async (req, res) => {
    try {
      const { id } = req.user; 
      const allowedUpdates = ["fullName", "profilePic", "phoneNumber", "address"];
  
      const updates = {};
      Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });
  
      if (Object.keys(updates).length === 0) {
        return res.error("No valid fields provided for update.", 400);
      }
  
      const user = await User.findByIdAndUpdate(
        id,
        { $set: updates }, 
        { new: true, runValidators: true } 
      );
  
      if (!user) {
        return res.error("User not found.", 404);
      }
  
      res.success("User profile updated successfully.", 200, user.toObject());
    } catch (error) {
      res.error("Internal server error.", 500, [error.message]);
    }
  };


export const upgradeToAdmin = async (req, res) => {
    try {
      const { id } = req.params; 
      
  
      const user = await User.findByIdAndUpdate(
        id,
        { role: 'admin'} 
      );
  
      if (!user) {
        return res.error("User not found.", 404);
      }
  
      res.success("User upgraded to admin successfully.", 200, user.toObject());
    } catch (error) {
      res.error("Internal server error.", 500, [error.message]);
    }
  };
  
  