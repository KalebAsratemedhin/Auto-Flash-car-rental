import mongoose from 'mongoose'; 

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
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
            enum: ['user', 'admin', 'super-admin'], 
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
        status: {
            type: ['active', 'suspended'], 
            default: 'active'

        },
        address: {
            type: String,
        },
        profilePic: {
            type: String,
        },
        googleId: {  
            type: String
        },
        isVerified: { type: Boolean, default: false },
        verificationToken: { type: String },
        verificationTokenExpires: { type: Date }, 
        resetPasswordToken: { type: String },
        resetPasswordExpires: { type: Date },
    },
    {
        timestamps: true,  
    }
); 

const User = mongoose.model('User', userSchema);
export default User;