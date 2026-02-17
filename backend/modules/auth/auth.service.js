import sequelize from '../../config/db.config.js';
import bcrypt from 'bcryptjs';
import { User } from '../../config/db.sync.js';

const authService = {
  register: async (requestBody) => {
    const { email, password, role } = requestBody;
    const transaction = await sequelize.transaction();

    try {
      const existingUser = await User.findOne({ where: { email }, transaction });
      
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const newUser = await User.create(
        { email, password, role },
        { transaction }
      );

      await transaction.commit();
      return newUser.toJSON(); 
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  login: async (requestBody) => {
    const { email, password } = requestBody;
    const transaction = await sequelize.transaction();

    try {
      const user = await User.findOne({ where: { email }, transaction });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid email or password');
      }

      await transaction.commit();
      return user.toJSON();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

export default authService;
