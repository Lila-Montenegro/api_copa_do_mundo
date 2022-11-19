import axios from "axios";
import { load } from "cheerio";
import newspapers from "../scrappingData/newspapersData";
import newspapersBrazil from "../scrappingData/newspapersDataBrazil";

export default class NewsService {
  async getNews(language?: string) {
    const papers = language == "pt-br" ? newspapersBrazil : newspapers;

    const news = [];
    await Promise.all(
      papers.map(async (newspaper) => {
        const { data: html } = await axios.get(newspaper.url);
        const $ = load(html);

        let article: any;
        $(`a:contains(${newspaper.keyWord})`, html).each(function () {
          const title = $(this).text();
          const url = $(this).attr("href");
          article = {
            title,
            url,
            newspaperName: newspaper.name,
          };
          news.push(article);
        });
      })
    );

    return news.filter((article) => article != undefined);
  }

  async getNewsByPaper(language: string, newspaperName: string) {
    const papers = language == "pt-br" ? newspapersBrazil : newspapers;

    const filteredNewspapers = papers.filter(
      (newspaper) => newspaper.name == newspaperName
    );

    const news = [];

    await Promise.all(
      filteredNewspapers.map(async (newspaper) => {
        const { data: html } = await axios.get(newspaper.url);
        const $ = load(html);

        let article: any;
        $(`a:contains(${newspaper.keyWord})`, html).each(function () {
          const title = $(this).text();
          const url = $(this).attr("href");
          article = {
            title,
            url,
            newspaperName: newspaper.name,
          };
          news.push(article);
        });
      })
    );

    return news;
  }
}
