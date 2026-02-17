### Patient Assistant Dashboard
A overview of the setup, deployment, and architecture of the Patient Assistant project.

### Setup & run instructions
1. Clone the reponsitory
    - Run: git clone: https://github.com/jeffyzxc/patient-assistant-dashboard.git
3. Backend setup and Frontend setup. 
   - In root folder run: npm install:all
4. AI Service Setup. 
   - In ai-service folder run pip install -r requirements.txt
3. Configure All the environment variables
4. Run Backend and frontend
   - In root folder, npm run start
5. Run AI Service. 
    - In ai-service folder run: python -m uvicorn app.main:app --reload

### Live deployment URLs for the frontend and backend
- Frontend: https://patient-assistant-dashboard-frontend.onrender.com
- Backend: https://patient-assistant-dashboard-backend.onrender.com
- API Service: https://patient-assistant-dashboard-ai-chat.onrender.com

### Environment variables
Create or update .env file for each folder

#### Frontend Environment (frontend/.env)
VITE_API_BASE_URL=https://patient-assistant-dashboard-backend.onrender.com/api

#### Backend Environment (backend/.env)
- DATABASE_URL=postgresql://patient_assistant_db_user:fGdoMw36RSXXpLY0QPXzGt420Ppmzt5P@dpg-d69v4h56ubrc73aqlejg-a.oregon-postgres.render.com/patient_assistant_db
- JWT_EXPIRES_IN=1h
- JWT_ACCESS_TOKEN_SECRET=9f2c8d1a7b3f4e8c9d2f1a0b7c6e5d4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8
- AI_CLIENT_ENDPOINT_URL=http://localhost:8000/generate

#### AI Service Environment (backend/.env)
- OPENAI_API_KEY=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

### Architecture overview
<img width="1245" height="352" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/10c41f06-da82-43db-b525-b4ad6b05551f" />


### AI usage disclosure (which parts were AI-assisted)
- AI Service was generated from CHAT GPT to generate response to patient question
- Python FastAPI chat service logic
- Node JS boilerplate for route, authenticated, middleware and etc
- React components boilerplate for components and redux
- AI was used as a reference tool for documentation lookup, and faster iteration during development.

### Schema design & indexing choices
<img width="631" height="501" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/c3e8f784-220d-4283-b72f-98935c2972d0" />

For Improvements: 
- to add ai_response field to store the AI-generated reply separately from the user message

### Authentication & security design
JWT-based authentication for stateless sessions

## Authentication 
Login flow: User submits email/password -> Node backend check credentials -> Returns access token and user information
Tokens is stored in local storage

## Security Measures
Password hashing: bcrypt (salted, slow hash)
Rate limiting for API endpoints to prevent abuse
Environment variables for secrets
Cors - for this project is set it to * for now

### AI service architecture
The backend forwards chat requests to the AI service, which generates and returns an AI response, which is returned to the backend and stored in the database.

(Refer to the architecture diagram above.)

### Scaling considerations & trade-offs 
## Frontend
- Lazy loading and code spliting for faster intial load

## Backend and Database
- Redis to cache database queries or AI responses to reduce repeated expensive operations
- Indexing for faster reads, better query performance.
