function authenticateSession(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log("Session ID:", req.sessionID);
    console.log("Session:", req.session);
    console.log("User:", req.session.user);

    if (req.session && req.session.user) {
        // User is authenticated, proceed to the next middleware or route handler
        console.log("✅ Session and user found.");
        console.log("Session ID:", req.sessionID);
        console.log("Session Data:", req.session);
        console.log("User Data:", req.session.user);
        console.log("✅ Authenticated User:", req.session.user);
        return next();
    } else {
        console.log("❌ Unauthorized - session or user missing.");
        return res.status(401).json({ success: false, message: "Unauthorized access!" });
    }
}

export default authenticateSession;