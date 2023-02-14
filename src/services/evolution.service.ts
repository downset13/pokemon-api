import { HttpError } from "../errors/http.error";
import { IEvolution } from "../interfaces/evolution.interface";
import Evolution from "../models/evolution.model";

interface findAllResult {
  data: IEvolution[];
  totalPages?: number;
  currentPage?: number;
}

export class EvolutionService {
  public async findAll(limit: number = 0, page: number = 0): Promise<findAllResult> {
    try {
      const evolution = await Evolution.find()
        .limit(limit * 1)
        .skip((page) * limit)
        .exec();
      const count = await Evolution.countDocuments();
      return Promise.resolve({
        data: evolution,
        totalPages: limit ? Math.ceil(count / limit) : undefined,
        currentPage: limit ? page : undefined,
        lastPage: limit ? Math.ceil(count / limit) - 1 === page : undefined
      });
    } catch (e: any) {
      throw new HttpError(e.message, 400);
    }
  }

  public find(id: string): Promise<IEvolution> {
    return Evolution.findById(id).exec();
  }

  public add(evolution: IEvolution): Promise<IEvolution> {
    const newEvolution = new Evolution(evolution);
    return newEvolution.save();
  }

  public async delete(id: string) {
    const deletedEvolution: Promise<IEvolution> = await Evolution.findByIdAndDelete(
      id
    ).exec();

    if (!deletedEvolution) {
      throw new HttpError(`Evolution with id '${id}' not found`, 404);
    }

    return deletedEvolution;
  }

  public async update(id: string, evolution: IEvolution | Partial<IEvolution>) {
    const updatedEvolution: Promise<IEvolution> = await Evolution.findByIdAndUpdate(
      id,
      evolution,
      { new: true }
    ).exec();

    if (!updatedEvolution) {
      throw new HttpError(`Evolution with id '${id}' not found`, 404);
    }
    return updatedEvolution;
  }
}
