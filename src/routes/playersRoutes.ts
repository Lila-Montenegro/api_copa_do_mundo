import { Router } from "express";
import PlayerController from "../controllers/playersController";

const playersRoutes = Router();
const controller = new PlayerController();

playersRoutes.get("/", controller.getAllPlayers);
playersRoutes.get("/:countryName", controller.getByCountry);

export default playersRoutes;
