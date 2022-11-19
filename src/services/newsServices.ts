import axios from "axios";
import { load } from "cheerio";
import newspapers from "../scrappingData/newspapersData";
import newspapersBrazil from "../scrappingData/newspapersDataBrazil";

export default class NewsService {
  async getNews(language?: string) {
    const papers = language ? newspapersBrazil : newspapers;

    const news = await Promise.all(
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
        });
        //está pegando só 1 artigo

        return article;
      })
    );

    const filtered = news.filter((article) => article != undefined);

    return filtered;
  }

  async getNewsByPaper(newspaperName: string, language?: string) {
    const papers = language ? newspapersBrazil : newspapers;

    const filteredNewspapers = papers.filter(
      (newspaper) => newspaper.name == newspaperName
    );
    const news = [];

    for (const newspaper of filteredNewspapers) {
      const { data: html } = await axios.get(newspaper.url);
      const $ = load(html);

      $(`a:contains("${newspaper.keyWord}")`, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        news.push({
          title,
          url,
          newspaperName: newspaper.name,
        });
      });
    }

    return news;
  }
}
