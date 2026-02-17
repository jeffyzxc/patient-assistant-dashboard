import axios from "axios";

const AI_SERVICE_URL = process.env.AI_CLIENT_ENDPOINT_URL;

export async function generateAIResponse(message) {
  try {
    const response = await axios.post(AI_SERVICE_URL, { message });

    return response.data;
  } catch (err) {
    console.error("AI service error:", err);
    return {
      reply: "Thank you for your question. As a dental assistant, brush twice a day, floss daily, and visit your dentist regularly.",
    };
  }
}
