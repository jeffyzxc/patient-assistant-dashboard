import sequelize from './db.config.js';
import UserModel from './../db/models/user.model.js';
import PatientModel from './../db/models/patient.model.js';
import ChatMessageModel from './../db/models/chat-message.model.js';

export const User = UserModel(sequelize);
export const Patient = PatientModel(sequelize);
export const ChatMessage = ChatMessageModel(sequelize);

export default async function syncDB() {
  try {
    await sequelize.sync();
    console.log('All tables synced with PostgreSQL');
  } catch (err) {
    console.error('Sync failed', err);
  }
}