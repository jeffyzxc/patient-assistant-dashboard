import sequelize from '../../config/db.config.js';
import { Patient } from "../../config/db.sync.js";

const PatientService = {
  create: async (requestBody) => {
    const { name, email, phone, DOB, medicalNote } = requestBody

    const transaction = await sequelize.transaction();
    const patientData = {
        name: name,
        email: email,
        phone: phone,
        DOB: DOB,
        medicalNote: medicalNote
    }

    try {
        const newPatient = await Patient.create(patientData, { transaction })

        await transaction.commit()

        return newPatient
    } catch (error) {
        await transaction.rollback()
        throw error
    }
  },
  update: async (patientId, requestBody) => {
    const { name, email, phone, DOB, medicalNote } = requestBody
    const transaction = await sequelize.transaction()
    try {
      const patientData = {
          name: name,
          email: email,
          phone: phone,
          DOB: DOB,
          medicalNote: medicalNote
      }

      const updatedPatient = await Patient.update(
        patientData,
        { where: { id: patientId, isDeleted: false }, transaction, returning: true }
      )

      await transaction.commit()
      return updatedPatient
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  delete: async (patientId) => {
    const transaction = await sequelize.transaction()
    try {
      const deletedPatient = await Patient.update(
        { isDeleted: true },
        { where: { id: patientId, isDeleted: false }, transaction, returning: true }
      )

      await transaction.commit()
      return deletedPatient
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  getAll: async ({ page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;

  const { rows, count } = await Patient.findAndCountAll({
    where: { isDeleted: false }, 
    limit: limit,
    offset: offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    data: rows,
    meta: {
      total: count,
      page: page,
      lastPage: Math.ceil(count / limit),
    },
  };
},
}

export default PatientService