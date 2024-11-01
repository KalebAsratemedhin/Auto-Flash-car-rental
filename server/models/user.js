const mongoose = require('mongoose'); 

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address'], 
        },
        role: {
            type: String,
            enum: ['user', 'admin'], 
            default: 'user',
        },
        password: {
            type: String,
            validate: {
                validator: function(value) {
                    return this.googleId || (value && value.length > 0);
                },
                message: 'Password is required for non-Google users.'
            }
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        profilePic: {
            type: String,
        },
        googleId: {  
            type: String
        }
    },
    {
        timestamps: true,  
    }
); 

const User = mongoose.model('User', userSchema);
module.exports = User;