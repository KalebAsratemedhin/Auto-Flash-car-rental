import Car from '../models/car.js'
import Rent from '../models/rent.js'
import User from '../models/user.js'


export const getUserSummary = async(req, res) => {
    try {
        
        const {id} = req.params
        const rentedCount = await Rent.countDocuments({rentee: id})
        let spent = 0

        res.status(200).json({message: "Success.", data: {posts: postCount, income, rented: rentedCount} })

        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error."})
        
    }
}

export const getCurrentUser =  async(req, res) => {
    try {
        const {id} = req.user
        const user = await User.findById(id)

        res.status(201).json({message: "User found.", data: user.toObject() })

        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }

}

export const getUserById =  async(req, res) => {
    try {

        const {id} = req.params
        const user = await User.findById(id)

        res.status(201).json({message: "User found.", data: user.toObject() })

        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }
}

