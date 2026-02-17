import { generateAIResponse } from '../../api/aiClient.js'
import sequelize from './../../config/db.config.js'
import { ChatMessage, Patient } from '../../config/db.sync.js'

const chatMessageService = {

  create: async (requestBody) => {
    const { patientId, message } = requestBody


    const transaction = await sequelize.transaction()
    try {
      const existingPatient = await Patient.findOne({ where: { id: patientId, isDeleted: false }, transaction })
      if (!existingPatient) throw new Error('Patient not found')

      const newMessage = await ChatMessage.create(
        { patientId, senderType: "User", message },
        { transaction }
      )

      const aiResponse = await generateAIResponse(message);

      const newAIMessage = await ChatMessage.create(
        { patientId, senderType: "AI", message: aiResponse.reply },
        { transaction }
      )

      await transaction.commit()
      return { inquiry: newMessage, response: newAIMessage }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  getAllByPatient: async (patientId) => {
    return ChatMessage.findAll({ where: { patientId } })
  }
}

export default chatMessageService;