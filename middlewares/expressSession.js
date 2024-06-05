import session from "express-session";

const configuerExpressSession = (app) => {
    app.use(session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: true,
            secure: false, // false for HTTP, true for HTTPS
            maxAge: 60 * 60 * 1000, // 1 hour
        }
    }));
};

export default configuerExpressSession;