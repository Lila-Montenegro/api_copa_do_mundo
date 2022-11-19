import { Router } from "express";
import NewsController from "../controllers/newsController";

const newsRoutes = Router();
const controller = new NewsController();

newsRoutes.get("/:language/", controller.getNews);
newsRoutes.get("/:language/paper/:newspaperName", controller.getNewsByPaper);

export default newsRoutes;
