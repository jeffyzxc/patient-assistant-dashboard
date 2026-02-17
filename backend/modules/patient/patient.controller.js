import {emailPatientValidator} from '../../validator/emailValidator.js';
import patientService from './patient.service.js' 

export const PatientController = {
  create: async (req, res) => {
    try {
      const { name, email, phone, DOB, medicalNote } = req.body

      await emailPatientValidator(email);

      const newPatient = await patientService.create({
        name,
        email,
        phone,
        DOB,
        medicalNote
      })

      res.status(201).json(newPatient)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  },

  update: async (req, res) => {
    try {
      const patientId = Number(req.params.id);

      await emailPatientValidator(req.body.email);

      const updatedPatient = await patientService.update(patientId, req.body)
      res.json(updatedPatient[1][0])
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  },

  delete: async (req, res) => {
    try {
      const patientId = Number(req.params.id)
      const deletedPatient = await patientService.delete(patientId)
      res.json(deletedPatient)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  },

  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10
      
      const patients = await patientService.getAll({ page, limit })

      res.json(patients)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message })
    }
  }
}
