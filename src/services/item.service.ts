import { HttpError } from "../errors/http.error";
import { IItem } from "../interfaces/item.interface";
import Item from "../models/item.model";

interface findAllResult {
  data: IItem[];
  totalPages?: number;
  currentPage?: number;
}

export class ItemService {
  public async findAll(limit: number = 0, page: number = 0): Promise<findAllResult> {
    try {
      const item = await Item.find()
        .limit(limit * 1)
        .skip((page) * limit)
        .exec();
      const count = await Item.countDocuments();
      return Promise.resolve({
        data: item,
        totalPages: limit ? Math.ceil(count / limit) : undefined,
        currentPage: limit ? page : undefined,
        lastPage: limit ? Math.ceil(count / limit) - 1 === page : undefined
      });
    } catch (e: any) {
      throw new HttpError(e.message, 400);
    }
  }

  public find(id: string): Promise<IItem> {
    return Item.findById(id).exec();
  }

  public add(item: IItem): Promise<IItem> {
    const newItem = new Item(item);
    return newItem.save();
  }

  public async delete(id: string) {
    const deletedItem: Promise<IItem> = await Item.findByIdAndDelete(
      id
    ).exec();

    if (!deletedItem) {
      throw new HttpError(`Item with id '${id}' not found`, 404);
    }

    return deletedItem;
  }

  public async update(id: string, item: IItem | Partial<IItem>) {
    const updatedItem: Promise<IItem> = await Item.findByIdAndUpdate(
      id,
      item,
      { new: true }
    ).exec();

    if (!updatedItem) {
      throw new HttpError(`Item with id '${id}' not found`, 404);
    }
    return updatedItem;
  }
}
