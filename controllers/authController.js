// import hashPassword from "../middlewares/bcrypt.js";
import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authUtil.js";
import bcrypt from 'bcrypt'
import session from 'express-session'

async function createUser(req, res) {
    if (!req.body || !req.body.email || !req.body.username || !req.body.password) {
        return res.status(400).json({
            success: false, message: "Invalid details!"
        });
    }
    try {
        const { email, username, password } = req.body;
        //Checking if the user already exists in the database
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'User already exists. Please fill out login details.'
            })
        }

        const hashedPassword = await hashPassword(password)
        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
        }).save();
        return res.status(201).json({
            success: true, 
            message: "Successfuly created account!",
            newUser
        });
    } catch (err) {
        
        console.log("[UserController/createUser] Error: ", err);
        return res.status(500).json({
            success: false, message: "Internal server error!"
        });
    }
}

async function loginUser(req, res) {
    
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false, message: "Invalid details!"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false, 
                message: "Account does not exist!"
            });
        }
        const passwordMatch = await comparePassword(password, user.password)
        if (passwordMatch) {
            req.session.user = { email: email, username: user.username };
            console.log(req.session)
            return res.status(200).json({
                success: true, 
                message: "Logged in!",
                user: req.session.user
            });
        } else {
            return res.status(403).json({
                success: false, message: "Invalid credentials!"
            });
        }
    } catch (err) {
        console.log("[UserController/loginUser] Error: ", err);
        return res.status(500).json({
            success: false, message: "Internal server error!"
        });
    }
}

async function logoutUser(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            console.log("[UserController/logoutUser] Error: ", err);
            return res.status(500).json({
                success: false,
                message: "Internal server error!"
            });
        } else {
            // Clear the cookie
            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
                secure: false, // Set to true if using HTTPS
                sameSite: 'Strict'
            });
            return res.status(200).json({
                success: true,
                message: "Logged out!"
            });
        }
    });
}

// async function resetUser(req, res) {
//     if (!req.body || !req.body.email || !req.body.otp) {
//         return res.status(400).json({
//             success: false, message: "Invalid details!"
//         });
//     }
//     const { email, otp } = req.body;
// }

// async function deleteUser(req, res) {
//     if (!req.body || !req.body.password) {
//         return res.status(400).json({
//             success: false, message: "Invalid details!"
//         });
//     }
//     try {
//         const { password } = req.body;
//         const user = await req.mongoConn.UserDB.findOne({ email: req.session.user.email });
//         if (!user) {
//             return res.status(404).json({
//                 success: false, message: "Account does not exist!"
//             });
//         }
//         const passwordMatch = await user.comparePassword(password);
//         if (passwordMatch) {
//             await req.mongoConn.User.findOneAndDelete({ email: req.session.user.email });
//             return res.status(200).json({
//                 success: true, message: "Account deleted!"
//             });
//         } else {
//             return res.status(403).json({
//                 success: false, message: "Invalid credentials!"
//             });
//         }
//     } catch (err) {
//         console.log("[UserController/deleteUser] Error: ", err);
//         return res.status(500).json({
//             success: false, message: "Internal server error!"
//         });
//     }
// }

export default { createUser, loginUser, logoutUser };