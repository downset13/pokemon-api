import { MONGO } from "./constants/pokeapi.constants";
import { PokemonController } from "./controllers/pokemon.controller";
import { PokemonService } from "./services/pokemon.service";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { handleErrors } from "./middleware/error-handler.middleware";
import mongoose from "mongoose";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from '../swagger';
import { ItemController } from "./controllers/item.controller";
import { ItemService } from "./services/item.service";
import { EvolutionController } from "./controllers/evolution.controller";
import { EvolutionService } from "./services/evolution.service";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
    this.setErrorHandlingMiddleware();
    this.app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.use('/uploads', express.static(__dirname + '/uploads'));
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO.url, MONGO.configuration);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_: any, converted: any) => {
        delete converted._id;
      },
    });
  }

  private setControllers() {
    const pokemonController = new PokemonController(new PokemonService());
    this.app.use("/pokemon", pokemonController.router);
    const itemController = new ItemController(new ItemService());
    this.app.use("/item", itemController.router);
    const evolutionController = new EvolutionController(new EvolutionService());
    this.app.use("/evolution", evolutionController.router);
  }

  private setErrorHandlingMiddleware() {
    this.app.use(handleErrors);
  }
}

export default new App().app;
