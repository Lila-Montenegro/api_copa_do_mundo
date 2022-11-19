import { Router } from "express";
import newsBrazilRoutes from "./newsBrazilRoutes";
import newsRoutes from "./newsRoutes";
import playersRoutes from "./playersRoutes";

const routes = Router();

routes.use("/news", newsRoutes);
routes.use("/newsBrazil", newsBrazilRoutes);
routes.use("/players", playersRoutes);

export default routes;
