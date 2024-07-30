import session from 'express-session';
import RedisStore from 'connect-redis';
import redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // Ensure this is set in your environment variables
});

const configureExpressSession = (app) => {
  app.use(session({
    store: new RedisStore({ client: redisClient }),
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
