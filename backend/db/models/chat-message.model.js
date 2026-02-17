import { DataTypes, Model } from 'sequelize'

const ChatMessageModel = (sequelize) => {
  class ChatMessage extends Model {}

  ChatMessage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Patients', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      senderType: {
        type: DataTypes.ENUM('User', 'AI'),
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      }
    },
    {
      sequelize,
      modelName: 'ChatMessage',
      timestamps: true
    }
  )

  ChatMessage.associate = (models) => {
    ChatMessage.belongsTo(models.Patient, { foreignKey: 'patientId' })
  }

  return ChatMessage
}

export default ChatMessageModel