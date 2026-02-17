import { DataTypes, Model } from 'sequelize'
import bcrypt from 'bcryptjs'

const ROLES = ['Admin'];

const UserModel = (sequelize) => {
  class User extends Model {
    toJSON () {
      const user = { ...this.dataValues }
      delete user.password
      return user
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            notNull: true,
            notEmpty: true,
            isEmail: true 
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Admin',
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [...ROLES]
        }
      }
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeValidate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  return User
}

export default UserModel