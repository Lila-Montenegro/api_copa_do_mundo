import { Request, Response } from "express";
import NewsService from "../services/newsServices";

const service = new NewsService();

export default class NewsController {
  async getNews(req: Request, res: Response) {
    const news = await service.getNews();

    res.json(news);
  }

  async getNewsBrazil(req: Request, res: Response) {
    const news = await service.getNews("port");

    res.json(news);
  }

  async getNewsByPaper(req: Request, res: Response) {
    const news = await service.getNewsByPaper(req.params.newspaperName);

    if (news.length == 0) {
      throw new Error(`We don't provide news from this paper`);
    }

    res.json(news);
  }

  async getNewsByPaperBrazil(req: Request, res: Response) {
    const news = await service.getNewsByPaper(req.params.newspaperName, "port");

    if (news.length == 0) {
      throw new Error(`We don't provide news from this paper`);
    }

    res.json(news);
  }
}
