import { Request, Response } from "express";
import NewsService from "../services/newsServices";

const service = new NewsService();

export default class NewsController {
  async getNews(req: Request, res: Response) {
    const news = await service.getNews(req.params.language);

    res.json(news);
  }

  async getNewsByPaper(req: Request, res: Response) {
    const news = await service.getNewsByPaper(
      req.params.language,
      req.params.newspaperName
    );

    if (news.length == 0) {
      throw new Error(`We don't provide news from this paper`);
    }

    res.json(news);
  }
}
