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