import { Router } from "express";
import newsRoutes from "./newsRoutes";
import playersRoutes from "./playersRoutes";

const routes = Router();

routes.use("/news", newsRoutes);
routes.use("/players", playersRoutes);

export default routes;
