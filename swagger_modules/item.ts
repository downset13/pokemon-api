export const itemPath = {
    '/item': {
        get: {
            tags: ['Item'],
            summary: 'Returns a list of items.',
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
            tags: ['Item'],
            summary: 'Creates a new item.',
            requestBody: {
                description: 'Item Data',
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
                                cost: {
                                    type: 'number',
                                    required: false
                                },
                                description: {
                                    type: 'string',
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
    '/item/{id}': {
        put: {
            tags: ['Item'],
            summary: 'Updates an item.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    description: 'Item ID'
                },
            ],
            requestBody: {
                description: 'Item Data',
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
                                cost: {
                                    type: 'number',
                                    required: false
                                },
                                description: {
                                    type: 'string',
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
            tags: ['Item'],
            summary: 'Deletes an item.',
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    type: 'string',
                    required: true,
                    description: 'Item ID'
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