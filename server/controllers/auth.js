const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const signup =  async(req, res) => {
    try {

        if(!req.body.username || !req.body.password || !req.body.email){
            return res.status(400).json({message: 'Invalid format'})
        }
        const {username, password, email} = req.body
        const hashedPassword = await bcrypt.hash(password, 8)
        console.log("hashed password", hashedPassword)

        const duplicate = await User.findOne({
            username
        })

        if(duplicate){
            return res.status(400).json({message: "Username is taken."})
        }
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email
        })

        console.log("new user ", newUser)

        const token = jwt.sign({username}, process.env.jwt_secret, {

            expiresIn: '2h'
        })

        console.log("new user ", newUser, token)

        
        res.status(201).json({message: "User created successfully", data: newUser.toObject() , accessToken: token})

        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }

}


const signin =  async(req, res) => {
    console.log("signin request body ", req.body)
    try {

        if(!req.body.username || !req.body.password ){
            return res.status(400).json({message: 'Invalid format'})
        }
        const {username, password} = req.body
        const user = await User.findOne({
            username: username
        })

        console.log("user", user)

        if(!user){
            return res.status(404).json({message: "The user is not found."})
        }

        await bcrypt.compare(password, user.password, (err, result) => {
            if(result){
                const token = jwt.sign({username}, process.env.jwt_secret, {
                    expiresIn: '2h'
                })
                console.log('sign in success',{message: "Successfully signed in.", accessToken: token, data: user.toObject()  } )

                 return res.status(200).json({message: "Successfully signed in.", accessToken: token, data: user.toObject()  })
            } 
            if (err){
                return res.status(400).json({message: "Wrong password"})
            }
        })

        
        
    } catch (error) {
        res.status(500).json({message: "Internal server error."})
        
    }

}

module.exports = {
    signin,
    signup
}