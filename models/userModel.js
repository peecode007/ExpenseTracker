import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter the email."],
        unique: [true, "Please enter a unique email address."],  // corrected the message
        match: [/.+\@.+\..+/, "Please enter a valid email address."],
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: [true, "Please enter the username."],
        unique: [true, "Please enter a unique username."],
        
    },
    password: {
        type: String,
        required: [true, "Please enter a password."],
        minlength: [6, "Password must be at least 6 characters long."],
    },
    // verifyToken: String,
    // verifyTokenExpiry: Date,
    // forgotPasswordToken: String, 
    // forgotPasswordTokenExpiry: Date
});

// Ensuring the model is not re-compiled if it's already in the models collection
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
