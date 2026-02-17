import chatMessageService from './chat-message.service.js'

export const ChatController = {
  sendMessage: async (req, res) => {
    try {
      const chat = await chatMessageService.create(req.body);

      return res.status(201).json(chat)
    } catch(error) {
      return res.status(500).json({ message: error.message })
    }
  },
  getAllChat: async (req, res) => {
    try {
      const patientId = req.params.id;
      const chat = await chatMessageService.getAllByPatient(patientId);

      return res.status(201).json(chat)
    } catch(error) {
      return res.status(500).json({ message: error.message })
    }
  }
}