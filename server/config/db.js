import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("Mongo db connected")
    } catch (error) { 
        console.log(`error ${error}`)
    }

};

export default connectDatabase;