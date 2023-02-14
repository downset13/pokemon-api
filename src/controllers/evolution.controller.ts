import { NextFunction, Request, Response, Router } from "express";
import { EvolutionService } from "../services/evolution.service";

export class EvolutionController {
  public router = Router();
  constructor(private evolutionService: EvolutionService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll);
    this.router.route("/:id").get(this.find);
    this.router.route("/").post(this.add);
    this.router.route("/:id").delete(this.delete).put(this.update);
  }

  private findAll = async (req: Request, res: Response, next: NextFunction) => {
    const evolutions = await this.evolutionService.findAll(Number(req.query.limit), Number(req.query.page));
    res.send(evolutions);
  };

  private find = async (req: Request, res: Response, next: NextFunction) => {
    const evolution = await this.evolutionService.find(req.params.id);
    res.send(evolution)
  }

  private add = async (req: Request, res: Response, next: NextFunction) => {
    const addEvolutionResult = await this.evolutionService.add(req.body);
    res.send(addEvolutionResult);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await this.evolutionService.delete(req.params.id);
    res.status(200).send('Evolution Deleted');
  };

  private update = async (req: Request, res: Response, next: NextFunction) => {
    const updateEvolutionResult = await this.evolutionService.update(
      req.params.id,
      req.body
    );
    res.send(updateEvolutionResult);
  };
}
