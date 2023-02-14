import { Document } from "mongoose";

export interface IEvolution extends Document {
  stageOneId: string;
  stageTwoId: string;
  stageThreeId: string;
}
