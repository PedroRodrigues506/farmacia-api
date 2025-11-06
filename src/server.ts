import  express  from "express";
import cors from "cors";
import { Router } from "express";
const server = express();
server.use(cors());
server.use(express.json());
server.use(Router);

export { server };