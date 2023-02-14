export const evolutionPath = {
    '/evolution': {
        get: {
            tags: ['Evolution'],
            summary: 'Returns a list of evolutions.',
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
            tags: ['Evolution'],
            summary: 'Creates a new evolution.',
            requestBody: {
                description: 'Defines the lineage of a pokemon through evolution',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                stageOneId: {
                                    type: 'string',
                                    required: true
                                },
                                stageTwoId: {
                                    type: 'string',
                                    required: true
                                },
                                stageThreeId: {
                                    type: 'string',
                                    required: true
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
    '/evolution/{id}': {
        put: {
            tags: ['Evolution'],
            summary: 'Updates an evolution.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    description: 'Evolution ID'
                },
            ],
            requestBody: {
                description: 'Item Data',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                stageOneId: {
                                    type: 'string',
                                    required: true
                                },
                                stageTwoId: {
                                    type: 'string',
                                    required: true
                                },
                                stageThreeId: {
                                    type: 'string',
                                    required: true
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
            tags: ['Evolution'],
            summary: 'Deletes an evolution.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    description: 'Evolution ID'
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