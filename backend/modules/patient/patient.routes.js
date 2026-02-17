import express from 'express'
import { PatientController } from './patient.controller.js'
import { authenticateJWT } from '../../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', authenticateJWT, PatientController.create)
router.get('/', authenticateJWT, PatientController.getAll)
router.put('/:id', authenticateJWT, PatientController.update)
router.delete('/:id', authenticateJWT, PatientController.delete)


export default router