import PatientRoute from '../modules/patient/patient.routes.js'
import AuthRoute from '../modules/auth/auth.routes.js';
import AIChatRoute from '../modules/ai-chat-message/chat-message.routes.js';
import { setupSwagger } from '../swagger.js';

const routes = [
  { path: '/patients', route: PatientRoute },
  { path: '/auth', route: AuthRoute },
  { path: '/chat', route: AIChatRoute },
];

const registerRoutes = (app) => { 
    routes.forEach(({ path, route }) => { 
        app.use(path, route ) }) 
} 
    


export {registerRoutes, routes}