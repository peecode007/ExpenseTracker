import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGODB_URI;

const configureExpressSession = (app) => {
  if (!mongoUrl) {
    console.error('❌ MONGODB_URI is not set. Sessions will not work properly.');
    return;
  }

  const isProduction = process.env.NODE_ENV === 'production';

  app.use(session({
    store: MongoStore.create({
      mongoUrl,
      collectionName: 'sessions',
      ttl: 7 * 24 * 60 * 60, // 7 days in seconds
      autoRemove: 'native',
    }),
    secret: process.env.COOKIE_SECRET || 'insecure_dev_secret_change_this',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,                          // HTTPS only in prod
      sameSite: isProduction ? 'None' : 'Lax',       // Cross-origin in prod
      maxAge: 7 * 24 * 60 * 60 * 1000,               // 7 days in ms
    }
  }));
};

export default configureExpressSession;
