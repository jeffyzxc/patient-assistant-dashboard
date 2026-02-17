from fastapi import FastAPI
from pydantic import BaseModel
import os
import openai
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "../.env"))

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set in .env")
openai.api_key = OPENAI_API_KEY

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/generate")
def generate(chat: ChatRequest):
    try:
        messages = [
            {"role": "system", "content": "You are a helpful dental assistant."},
            {
                "role": "user",
                "content": f"Patient question: {chat.message}\nProvide a professional and helpful response."
            }
        ]

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.7,
            max_tokens=200
        )

        reply = response.choices[0].message.content.strip()
        return {"reply": reply}

    except Exception as e:
        mock_reply = (
            "This is a fallback mock response due to OpenAI API limit."
            "Thank you for your question. "
            "As a dental assistant, I recommend maintaining proper oral hygiene: "
            "brush twice a day, floss daily, and schedule regular dental check-ups every 6 months. "
            "If you experience pain or discomfort, consult a dentist promptly."
        )
        return {"reply": mock_reply}
