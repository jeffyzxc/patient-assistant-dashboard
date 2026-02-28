## Patient Assistant Dashboard
An overview of the setup, deployment, and architecture of the Patient Assistant project.

## Setup & Run Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/jeffyzxc/patient-assistant-dashboard.git
   cd patient-assistant-dashboard
   ```
2. **Install Backend and Frontend dependencies**
   ```bash
   npm run install:all
   ```
3. **AI Service Setup**
   ```bash
   cd ai-service
   pip install --user -r requirements.txt
   ```
   > Using `--user` avoids permission issues on Windows.
4. **Configure environment variables**
   * Update or Create a `.env` file in `frotnend`, `backend`, and `ai-service` folders if needed.
   * Add your API keys and other required variables.
5. **Run Backend and Frontend**
   ```bash
   cd ..  # back to root folder
   npm run start
   ```
6. **Run AI Service**
   ```bash
   cd ai-service
   python -m uvicorn main:app --reload
   ```
   
### Notes / Tips
* Run PowerShell or CMD as dministrator if you encounter permission errors when installing packages or running uvicorn.

## Environment variables
Create or update .env file for each folder

### Frontend Environment (frontend/.env)
VITE_API_BASE_URL={VITE_API_BASE_URL}

### Backend Environment (backend/.env)
- DATABASE_URL={DATABASE_URL
- JWT_EXPIRES_IN=1h
- JWT_ACCESS_TOKEN_SECRET={ACCESS_SECRET}
- AI_CLIENT_ENDPOINT_URL={AI_CLIENT_ENDPOINT}

### AI Service Environment (backend/.env)
- OPENAI_API_KEY={OPEN_API_KEY}

## Architecture overview
<img width="1245" height="352" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/10c41f06-da82-43db-b525-b4ad6b05551f" />


## AI usage disclosure (which parts were AI-assisted)
- AI Service was generated from CHAT GPT to generate response to patient question
- Python FastAPI chat service logic
- Node JS boilerplate for route, authentication, middleware and etc
- React components boilerplate for components and redux
- AI was used as a reference tool for documentation lookup, and faster iteration during development.

## Schema design & indexing choices
<img width="631" height="501" alt="Untitled Diagram drawio" src="https://github.com/user-attachments/assets/c3e8f784-220d-4283-b72f-98935c2972d0" />

For Improvements: 
- to add ai_response field in Chat Message Table to store the AI-generated reply together with the user message.

## Authentication & security design
JWT-based authentication for stateless sessions

### Authentication 
- Login flow: User submits email/password -> Node backend check credentials -> Returns access token and user information
- Tokens is stored in local storage and attach to every request

### Security Measures
- Password hashing: bcrypt (salted, slow hash)
- Rate limiting for API endpoints to prevent abuse
- Environment variables for secrets
- Cors - for this project is set it to ***all*** for now

## AI service architecture
The backend forwards chat requests to the AI service, which generates and returns an AI response, which is returned to the backend and stored in the database.

(Refer to the architecture diagram above.)

## Scaling considerations & trade-offs 

### Frontend
- Lazy loading and code spliting for faster intial load

### Backend and Database
- Redis to cache database queries or AI responses to reduce repeated expensive operations 
- Indexing for faster reads, better query performance.
- Vertical scaling
#### Tradeoffs 
- Since the project is currently small adding complex scaling infrastructure (vertical/horizontal scaling, caching, and etc) was not necessary and would increase development and maintenance overhead.
