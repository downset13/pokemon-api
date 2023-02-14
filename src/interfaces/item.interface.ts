import { Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  cost: number;
  description: string;
  photo: File;
}
