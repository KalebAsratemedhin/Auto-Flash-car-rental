import Rent from '../models/rent.js'
import User from '../models/user.js'
import Car from '../models/car.js'


export const getUserSummary = async(req, res) => {
    try {
        
        const {id} = req.params
        const result = await Rent.aggregate([
            { $match: { rentee: mongoose.Types.ObjectId(id) } }, 
            {
              $group: {
                _id: null,
                totalCost: { $sum: "$cost" }, 
                rentCount: { $sum: 1 }    
              }
            }
          ]);
      
        const data = result.length > 0 ? result[0] : { totalCost: 0, rentCount: 0 };

        res.success("User summary fetched successfully.", 200, data)

        
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);        
    }
}

export const getAdminSummary = async(req, res) => {
    try {
        
        const {id} = req.params
        const result = await Rent.aggregate([
            { $match: { renter: mongoose.Types.ObjectId(id) } }, 
            {
              $group: {
                _id: null,
                totalCost: { $sum: "$cost" }, 
                rentCount: { $sum: 1 }    
              }
            }
          ]);

        const posts = await Car.countDocuments({owner: id})
      
        let data = result.length > 0 ? result[0] : { totalCost: 0, rentCount: 0 };
        data.posts = posts

        res.success("User summary fetched successfully.", 200, data)

        
    } catch (error) {
        res.error('Internal server error.', 500, [error.message]);        
    }
}

export const getCurrentUser =  async(req, res) => {
    try {
        const {id} = req.user
        const user = await User.findById(id)

        res.success("Current user found.", 200, user.toObject())

        
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
      const { id } = req.user; 
      
  
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
  
  