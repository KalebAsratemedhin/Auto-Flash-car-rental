const Car = require('../models/car')
const Rent = require('../models/rent')
const User = require('../models/user')


const getUserSummary = async(req, res) => {
    try {
        const {username} = req.user

        const postCount = await Car.countDocuments({username})
        const rentedCount = await Rent.countDocuments({rentee: username})

        let income = 0

        res.status(200).json({message: "Success.", data: {posts: postCount, income, rented: rentedCount} })

        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }
}

const getCurrentUser =  async(req, res) => {
    try {
        console.log('req.', req.user)

        const {username} = req.user

        const user = await User.findOne({
            username
        })


        res.status(201).json({message: "User found.", data: user.toObject() })

        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }

}


module.exports = {
    getCurrentUser,
    getUserSummary
}