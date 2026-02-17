export interface ChatMessage {
  id: number;
  patientId: number;           
  senderType: "User" | "AI";   
  message: string;         
  createdAt: string;      
  updatedAt: string;    
}

export type ChatHistoryResponse = ChatMessage[];


export interface AIChatResponse {
  inquiry: ChatMessage;
  response: ChatMessage;
}

export interface SendMessageRequest {
    message: string;
    patientId: number
}