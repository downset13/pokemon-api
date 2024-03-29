export const pokemonPath = {
    '/pokemon': {
        get: {
            tags: ['Pokemon'],
            summary: 'Returns a list of pokemon.',
            parameters: [
                {
                    in: 'query',
                    name: 'page',
                    type: 'integer',
                    minimum: 0,
                    required: false,
                    description: 'Page'
                },
                {
                    in: 'query',
                    name: 'limit',
                    type: 'integer',
                    minimum: 1,
                    required: false,
                    description: 'Count Per Page (if not defined, fetches all)'
                }
            ],
            produces: [
                'application/json'
            ],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        },
        post: {
            tags: ['Pokemon'],
            summary: 'Creates a new pokemon.',
            requestBody: {
                description: 'Pokemon Data',
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    required: true
                                },
                                type: {
                                    type: 'string',
                                    required: false
                                },
                                gender: {
                                    type: 'string',
                                    required: false
                                },
                                hp: {
                                    type: 'number',
                                    required: false
                                },
                                attack: {
                                    type: 'number',
                                    required: false
                                },
                                defense: {
                                    type: 'number',
                                    required: false
                                },
                                photo: {
                                    type: 'string',
                                    format: 'binary',
                                    required: false
                                }
                            }
                        }
                    }
                }
            },
            produces: [
                'application/json'
            ],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    },
    '/pokemon/{id}': {
        put: {
            tags: ['Pokemon'],
            summary: 'Updates a pokemon.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    description: 'Pokemon ID'
                },
            ],
            requestBody: {
                description: 'Pokemon Data',
                required: true,
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    required: true
                                },
                                type: {
                                    type: 'string',
                                    required: false
                                },
                                gender: {
                                    type: 'string',
                                    required: false
                                },
                                hp: {
                                    type: 'number',
                                    required: false
                                },
                                attack: {
                                    type: 'number',
                                    required: false
                                },
                                defense: {
                                    type: 'number',
                                    required: false
                                },
                                photo: {
                                    type: 'string',
                                    format: 'binary',
                                    required: false
                                }
                            }
                        }
                    }
                }
            },
            produces: [
                'application/json'
            ],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        },
        delete: {
            tags: ['Pokemon'],
            summary: 'Deletes a pokemon.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    description: 'Pokemon ID'
                },
            ],
            produces: [
                'application/json'
            ],
            responses: {
                200: {
                    description: 'OK'
                }
            }
        }
    }
}