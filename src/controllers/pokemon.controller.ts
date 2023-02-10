import { NextFunction, Request, Response, Router } from "express";

import { PokemonService } from "../services/pokemon.service";

export class PokemonController {
  public router = Router();
  constructor(private pokemonService: PokemonService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll);
    this.router.route("/:id").get(this.find);
    this.router.route("/").post(this.add);
    this.router.route("/:id").delete(this.delete).put(this.update);
  }

  private findAll = async (req: Request, res: Response, next: NextFunction) => {
    const pokemon = await this.pokemonService.findAll(Number(req.query.limit), Number(req.query.page));
    res.send(pokemon);
  };

  private find = async (req: Request, res: Response, next: NextFunction) => {
    const pokemon = await this.pokemonService.find(req.params.id);
    res.send(pokemon)
  }

  private add = async (req: Request, res: Response, next: NextFunction) => {
    const addPokemonResult = await this.pokemonService.add(req.body);
    res.send(addPokemonResult);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const deletePokemonResult = await this.pokemonService.delete(req.params.id);
    res.send(deletePokemonResult);
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    const updatePokemonResult = await this.pokemonService.update(
      req.params.id,
      req.body
    );
    res.send(updatePokemonResult);
  };
}
