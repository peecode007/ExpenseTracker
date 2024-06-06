function authenticateSession(req, res, next) {
    console.log("Session:", req.session); // Log session details
    if (req.session && req.session.user) {
        console.log("Authenticated User:", req.session.user); // Log user details
        next();
    } else {
        res.status(401).json({ success: false, message: "Unauthorized access!" });
    }
}

export default authenticateSession;
