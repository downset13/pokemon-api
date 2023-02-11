import { Document } from "mongoose";

export interface IPokemon extends Document {
  name: string;
  type: string;
  gender: string;
  hp: number;
  attack: number;
  defense: number;
  photo: File;
}
