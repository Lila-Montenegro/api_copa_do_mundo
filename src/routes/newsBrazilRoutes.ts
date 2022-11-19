import { Router } from "express";
import NewsController from "../controllers/newsController";

const newsBrazilRoutes = Router();
const controller = new NewsController();

newsBrazilRoutes.get("/", controller.getNewsBrazil);
newsBrazilRoutes.get("/:newspaperName", controller.getNewsByPaperBrazil);

export default newsBrazilRoutes;
