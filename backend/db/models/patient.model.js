import { DataTypes, Model } from 'sequelize'

const PatientModel = (sequelize) => {
  class Patient extends Model {}

  Patient.init(
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
      medicalNote: {
        type: DataTypes.STRING,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false, 
          validate: {
            notNull: true,
            notEmpty: true,
            isNumeric: { msg: "Phone must contain only numbers" },
            len: { args: [7, 15], msg: "Phone number must be 7-15 digits long" }
          }
      },
      DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
          isDate: true
        }
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Patient',
      timestamps: true
    }
  )

  return Patient
}

export default PatientModel