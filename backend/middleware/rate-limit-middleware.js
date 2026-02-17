import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login requests per windowMs
  message: {
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
  },
  standardHeaders: true, // return rate limit info in headers
  legacyHeaders: false, // disable `X-RateLimit-*` headers
});