import axios from "axios";
import { load } from "cheerio";
import countriesData from "../scrappingData/countriesData";

const getPlayerNameAndPosition = (info: string) => {
  const playerInfo = info.split(" ");
  const slicePosition = playerInfo.length;

  const name = playerInfo
    .slice(1, slicePosition - 2)
    .toString()
    .replace(",", " ");
  const position = playerInfo[slicePosition - 2];

  return { name, position };
};

const baseUrl = "https://www.mykhel.com";

export default class PlayerService {
  async getAllPlayers() {
    const players = [];

    await Promise.all(
      countriesData.map(async (country) => {
        const { data: html } = await axios.get(country.url);
        const $ = load(html);

        $("div.playerinfo-top", html).each(function () {
          const img = $(this)
            .children(".playerinfo-img")
            .children("img")
            .attr("src");
          const info = $(this).children(".playerinfo-name").text();

          const { name, position } = getPlayerNameAndPosition(info);

          const player = {
            name,
            position,
            image: baseUrl + img,
            country: country.name,
          };

          players.push(player);
        });
      })
    );

    return players;
  }

  async getByCountry(countryName: string) {
    const players = [];

    const country = countriesData.find(
      (country) => country.name == countryName
    );

    const { data: html } = await axios.get(country.url);
    const $ = load(html);

    $("div.playerinfo-top", html).each(function () {
      const img = $(this)
        .children(".playerinfo-img")
        .children("img")
        .attr("src");
      const info = $(this).children(".playerinfo-name").text();

      const { name, position } = getPlayerNameAndPosition(info);

      const player = {
        name,
        position,
        image: baseUrl + img,
      };

      players.push(player);
    });

    return players;
  }
}
