import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from environment variables.");
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Successfully connected to MongoDB");
    } catch (error) {
        console.error("❌ Failed to connect to the database:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
