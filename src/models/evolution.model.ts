import { Schema, model } from "mongoose";

import { IEvolution } from "../interfaces/evolution.interface";

export const EvolutionSchema = new Schema(
  {
    stageOneId: { type: String, required: [true, "Stage One Pokemon ID Required"] },
    stageTwoId: { type: String, required: [true, "Stage Two Pokemon ID Required"] },
    stageThreeId: { type: String, required: [true, "Stage Three Pokemon ID Required"] }
  },
  { versionKey: false }
);

const Item = model<IEvolution>("Evolution", EvolutionSchema);

export default Item;
