import { Request, Response } from "express";
import PlayerService from "../services/playersServices";

const service = new PlayerService();

export default class PlayerController {
  async getAllPlayers(req: Request, res: Response) {
    const players = await service.getAllPlayers();
    //demorando muito!

    res.json(players);
  }

  async getByCountry(req: Request, res: Response) {
    const countryName = req.params.countryName;

    const players = await service.getByCountry(countryName);

    if (players.length == 0) {
      throw new Error(`${countryName} is not in the world cup 2022`);
    }

    res.json(players);
  }
}
