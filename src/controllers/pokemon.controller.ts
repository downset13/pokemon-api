import { NextFunction, Request, Response, Router } from "express";
import { PokemonService } from "../services/pokemon.service";
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

export class PokemonController {
  public router = Router();
  constructor(private pokemonService: PokemonService) {
    this.setRoutes();
  }

  public setRoutes() {
    this.router.route("/").get(this.findAll);
    this.router.route("/:id").get(this.find);
    this.router.route("/").post(upload.single('photo'), this.add);
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
    if (req?.file) {
      const extension = (path.extname(req.file.originalname)).toLowerCase();
      if (extension !== '.jpg' && extension !== '.jpeg' && extension !== '.png') {
        res.status(422).send('Photo must be jpg or png.');
        return next();
      }
    }
    const addPokemonResult = await this.pokemonService.add({
      ...req.body,
      photo: req?.file ? `uploads/${req.file.originalname + Date.now() + path.extname(req.file.originalname)}` : undefined
    });
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
