import { pokemonPath } from './swagger_modules/pokemon';
import { itemPath } from './swagger_modules/item';
import { evolutionPath } from './swagger_modules/evolution'

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Poke API',
        description: 'Gotta catch em all'
    },
    paths: {
        ...pokemonPath,
        ...itemPath,
        ...evolutionPath
    }
};