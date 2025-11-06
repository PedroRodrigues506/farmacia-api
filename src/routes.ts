import { Router } from "express";
import type { Request, Response } from "express";
import ClienteController from "./controller/ClienteController.js";

const routes = Router();

routes.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

routes.get("/api/clientes", ClienteController.todos);

routes.post("/api/clientes", ClienteController.novo);

routes.get("/api/clientes/:cpf", ClienteController.cliente);

export { routes };