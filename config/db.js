import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
        });
        console.log("✅ Successfully connected to MongoDB");
    } catch (error) {
        console.error("❌ Failed to connect to the database:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
