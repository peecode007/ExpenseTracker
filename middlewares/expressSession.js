import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGODB_URI; // Ensure this is set in your environment variables

const configureExpressSession = (app) => {
  app.use(session({
    store: MongoStore.create({ mongoUrl }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'None', // Required for cross-origin requests
      secure: process.env.NODE_ENV === 'production', // Ensure HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    }
  }));
};

export default configureExpressSession;
