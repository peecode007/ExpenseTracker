function authenticateSession(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, message: "Unauthorized access!" });
    }
}
export default authenticateSession;