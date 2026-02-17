import express from 'express'
import { ChatController } from './chat-message.controller.js'

const router = express.Router()

router.post('/', ChatController.sendMessage)
router.get('/getAll/:id', ChatController.getAllChat)


export default router