import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter the email."],
        unique: [true, "Please enter a unique email address."],  // corrected the message
        match: [/.+\@.+\..+/, "Please enter a valid email address."] // added email format validation
    },
    password: {
        type: String,
        required: [true, "Please enter the password."]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String, 
    forgotPasswordTokenExpiry: Date
});

// Ensuring the model is not re-compiled if it's already in the models collection
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
