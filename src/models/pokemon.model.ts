import { Schema, model } from "mongoose";

import { IPokemon } from "../interfaces/pokemon.interface";

export const PokemonSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    type: { type: String, required: false },
    gender: { type: String, required: false },
    hp: { type: Number, required: false },
    attack: { type: Number, required: false },
    defense: { type: Number, required: false },
    photo: { type: String, required: false },
  },
  { versionKey: false }
);

const Pokemon = model<IPokemon>("Pokemon", PokemonSchema);

export default Pokemon;
