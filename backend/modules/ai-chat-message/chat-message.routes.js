import express from 'express'
import { ChatController } from './chat-message.controller.js'
import { authenticateJWT } from '../../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', authenticateJWT, ChatController.sendMessage)
router.get('/getAll/:id', authenticateJWT, ChatController.getAllChat)


export default router