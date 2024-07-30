import session from "express-session";

const configuerExpressSession = (app) => {
    app.use(session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 1000, // 1 hour
        }
    }));
};

export default configuerExpressSession;