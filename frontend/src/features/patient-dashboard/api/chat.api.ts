import api from "../../../config/api";
import type { AIChatResponse, ChatHistoryResponse, SendMessageRequest } from "../interfaces/chat.interface";

export const sendMessage = async (data: SendMessageRequest): Promise<AIChatResponse> => {
  const response = await api.post(`/chat`, data);
  return response.data;
};

export const getChatHistory = async (patientId: number): Promise<ChatHistoryResponse> => {
  const response = await api.get(`/chat/getAll/${patientId}`);
  return response.data;
};