import authService from './auth.service.js';
import jwtHelper from './jwt.service.js';


export const authController = {
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      const user = await authService.register({ email, password, role });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authService.login({ email, password });
      
      const token = jwtHelper.generateJWT({
        payload: { id: user.id, email: user.email, role: user.role }
      });

      return res.json({
        ...user, 
        token,
        expiresAt: Math.floor(Date.now() / 1000) + 3600
      });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }
};