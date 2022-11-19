import { Router } from "express";
import NewsController from "../controllers/newsController";

const newsRoutes = Router();
const controller = new NewsController();

newsRoutes.get("/", controller.getNews);
newsRoutes.get("/:newspaperName", controller.getNewsByPaper);

newsRoutes.get('/pt-br/')

export default newsRoutes;
