import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Succesfully connected to MongoDB");
    } catch (error) {
        console.log("Failed to connect database");
    }
}

export default connectDB