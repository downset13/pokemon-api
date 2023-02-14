import { Schema, model } from "mongoose";

import { IItem} from "../interfaces/item.interface";

export const ItemSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    cost: { type: Number, required: false },
    description: { type: String, required: false },
    photo: { type: String, required: false },
  },
  { versionKey: false }
);

const Item = model<IItem>("Item", ItemSchema);

export default Item;
