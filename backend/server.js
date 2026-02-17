import express from "express";
import dotenv from "dotenv";
import syncDB from "./config/db.sync.js";
import {registerRoutes, routes} from "./loaders/routes.loader.js";
import cors from "cors";
import { rateLimiter } from './middleware/rate-limit-middleware.js';
import { setupSwagger } from "./swagger.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());


const router = express.Router();
router.use(rateLimiter);
registerRoutes(app);
setupSwagger(app, routes)

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 3000;
(async () => {
  await syncDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();