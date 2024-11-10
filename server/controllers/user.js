const Car = require('../models/car')
const Rent = require('../models/rent')
const User = require('../models/user')


const getUserSummary = async(req, res) => {
    try {

        console.log('summary of', req.params)
        
        const {id} = req.params


        const postCount = await Car.countDocuments({owner: id})
        console.log('post coun', postCount)

        const rentedCount = await Rent.countDocuments({rentee: id})
        console.log('rented coun', rentedCount)



        let income = 0

        console.log('res', {posts: postCount, income, rented: rentedCount})

        res.status(200).json({message: "Success.", data: {posts: postCount, income, rented: rentedCount} })

        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Internal server error."})
        
    }
}

const getCurrentUser =  async(req, res) => {
    try {
        console.log('req.', req.user)

        const {id} = req.user

        const user = await User.findById(id)


        res.status(201).json({message: "User found.", data: user.toObject() })

        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }

}

const getUserById =  async(req, res) => {
    try {

        const {id} = req.params

        const user = await User.findById(id)


        res.status(201).json({message: "User found.", data: user.toObject() })

        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }

}

module.exports = {
    getCurrentUser,
    getUserSummary,
    getUserById
}