import { HttpError } from "../errors/http.error";
import { IPokemon } from "../interfaces/pokemon.interface";
import Pokemon from "../models/pokemon.model";

interface findAllResult {
  data: IPokemon[];
  totalPages?: number;
  currentPage?: number;
}

export class PokemonService {
  public async findAll(limit: number = 0, page: number = 0): Promise<findAllResult> {
    try {
      const pokemon = await Pokemon.find()
        .limit(limit * 1)
        .skip((page) * limit)
        .exec();
      const count = await Pokemon.countDocuments();
      return Promise.resolve({
        data: pokemon,
        totalPages: limit ? Math.ceil(count / limit) : undefined,
        currentPage: limit ? page : undefined,
        lastPage: limit ? Math.ceil(count / limit) - 1 === page : undefined
      });
    } catch (e: any) {
      throw new HttpError(e.message, 400);
    }
  }

  public find(id: string): Promise<IPokemon> {
    return Pokemon.findById(id).exec();
  }

  public add(pokemon: IPokemon): Promise<IPokemon> {
    const newPokemon = new Pokemon(pokemon);
    return newPokemon.save();
  }

  public async delete(id: string) {
    const deletedPokemon: Promise<IPokemon> = await Pokemon.findByIdAndDelete(
      id
    ).exec();

    if (!deletedPokemon) {
      throw new HttpError(`Pokemon with id '${id}' not found`, 404);
    }

    return deletedPokemon;
  }

  public async update(id: string, pokemon: IPokemon | Partial<IPokemon>) {
    const updatedPokemon: Promise<IPokemon> = await Pokemon.findByIdAndUpdate(
      id,
      pokemon,
      { new: true }
    ).exec();

    if (!updatedPokemon) {
      throw new HttpError(`Pokemon with id '${id}' not found`, 404);
    }
    return updatedPokemon;
  }
}
