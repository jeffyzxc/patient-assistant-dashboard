import { verifyJWT } from './../modules/auth/jwt.service.js';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = verifyJWT({ token: authHeader });
    req.user = user; 
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    return res.status(403).json({ message: 'Unauthorized' });
  }
};
