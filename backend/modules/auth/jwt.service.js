import jwt from 'jsonwebtoken';

export const generateJWT = ({
  payload,
  secretKey = process.env.JWT_ACCESS_TOKEN_SECRET,
  signOptions = { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
}) => {
  try {
    const token = jwt.sign(payload, secretKey, signOptions);
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const verifyJWT = ({
  token,
  secretKey = process.env.JWT_ACCESS_TOKEN_SECRET,
  verifyOptions = {}
}) => {
  try {
    const rawToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
    const data = jwt.verify(rawToken, secretKey, verifyOptions);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { generateJWT, verifyJWT };
