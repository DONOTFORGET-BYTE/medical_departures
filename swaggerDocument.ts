export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        "title": "Medical Departures Backend Test",
        "description": "This is a REST API that uses Node Js Express HTTP Typescript and SQL to implement sign in,sign up and a blog",
        "version": "1.0.0",
        "contact": {
            "email": "shattyadrenal1@gmail.com"
        },
        "must-know": "to perform CRUD operations on the blog and user profile you must be logged in and append the access token to the authorization headers of every request using tools such as POSTMAN etc. The access token is valid for 1h ,once it expires login again to get a new one"
    },
    schemes: ["http"],
    apis: ["./src/routes/*.ts"],
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local Server"
        }
    ],
    components: {
        schemas: {
            BlogModel: {
                type: "object",
                required: [
                    "user_id",
                    "title",
                    "author",
                    "content"
                ],
                properties: {
                    blog_id: {
                        type: "int",
                        description: "the auto generated unique identifer for every blog created",
                        example: "1"
                    },
                    author: {
                        type: "int",
                        description: "foreign key ,identifies the user associated with the blog",
                        example: "1"
                    },
                    title: {
                        type: "string",
                        description: "title of the blog",
                        example: "sample blog"
                    },
                    content: {
                        type: "string",
                        description: "content of the blog",
                        example: "sample blog content"
                    },
                }
            },
            BlogCreate: {
                type: "object",
                required: [
                    "title",
                    "content"
                ],
                properties: {
                    title: {
                        type: "string",
                        description: "title of the blog",
                        example: "sample blog"
                    },
                    content: {
                        type: "string",
                        description: "content of the blog",
                        example: "sample blog content"
                    },
                }
            },
            BlogResponseMessage: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "reports the result of operation",
                        example: "information updated/blog deleted"
                    },
                }
            },
            UsersModel: {
                type: "object",
                required: [
                    "email",
                    "password"
                ],
                properties: {
                    user_id: {
                        type: "int",
                        description: "the auto generated unique identifer for every user created",
                        example: "1"
                    },
                    email: {
                        type: "string",
                        description: "a unique email address for user used for logging in",
                        example: "Tinashe"
                    },
                }
            },
            UserProfileModel: {
                type: "object",
                required: [
                    "email",
                    "name",
                    "surname",
                    "phone"
                ],
                properties: {
                    id: {
                        type: "int",
                        description: "the auto generated unique identifer for every user_profile created",
                        example: "1"
                    },
                    user_id: {
                        type: "int",
                        description: "foreign key ,identifies the user associated with the profile",
                        example: "1"
                    },
                    name: {
                        type: "string",
                        description: "name of user",
                        example: "Tinashe"
                    },
                    surname: {
                        type: "string",
                        description: "surname of user",
                        example: "Wick"
                    },
                    phone: {
                        type: "string",
                        description: "user phone number",
                        example: "0617527602"
                    },
                }
            },
            RegisterUser: {
                type: "object",
                required: [
                    "email",
                    "password",
                    "passwordConfirmation"
                ],
                properties: {
                    email: {
                        type: "string",
                        description: "must be valid and unique",
                        example: "1"
                    },
                    password: {
                        type: "string",
                        description: "must be latin characters and minimum length is 6",
                        example: "123456"
                    },
                    passwordConfirmation: {
                        type: "string",
                        description: "must match password",
                        example: "123456"
                    },
                }
            },
            RegisterResponseMessage: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "returns email registered with",
                        example: "shattyadrenal1@gmail.com"
                    },
                    name: {
                        type: "string",
                        description: "returns an empty user name ,indicating user profile created",
                        example: ""
                    },
                    surname: {
                        type: "string",
                        description: "returns an empty surname ,indicating user profile created",
                        example: ""
                    },
                    phone: {
                        type: "string",
                        description: "returns an empty phone ,indicating user profile created",
                        example: ""
                    },
                }
            },
            LoginUser: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "user email must be valid and registered",
                        example: "shattyadrenal1@gmail.com"
                    },
                    password: {
                        type: "string",
                        description: "returns an empty user name ,indicating user profile created",
                        example: ""
                    }
                }
            },
            SuccessfullLogin: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        description: "user email",
                        example: "shattyadrenal1@gmail.com"
                    },
                    message: {
                        type: "string",
                        description: "result message",
                        example: "logged in"
                    },
                    accessToken: {
                        type: "string",
                        description: "access token used to verify user is logged in and allows access to system resources",
                        example: "eyJdksdsk..."
                    },
                    user: {
                        type: "object",
                        description: "returns user detailes"
                    }
                }
            },
            InvalidResponse: {
                "type": "object",
                "properties": {
                    "statusCode": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    }
                }
            }
        }
    },
    tags: [
        {
            name: "users",
            description: "register, login and update a user"
        },
        {
            name: "Blog",
            desciption: "CRUD operations on blog model"
        },
    ],
    paths : {
        "/api/users/register" : {
            post : {
                tags: ["users"],
                summary : "register a user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/RegisterUser'
                            }

                        }
                    }
                },
                responses: {
                    "200": {
                        description: "successfully registered",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/RegisterResponseMessage'
                                }
        
                            }
                        }
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/users/login" : {
            post : {
                tags: ["users"],
                summary : "login a user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/LoginUser'
                            }

                        }
                    }
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/SuccessfullLogin'
                                }
        
                            }
                        }
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/user_profile/update/{userId}" : {
            put : {
                tags: ["users"],
                summary : "update user profile",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/RegisterResponseMessage'
                            }

                        }
                    }
                },
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/RegisterResponseMessage'
                                }
        
                            }
                        }
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/user_profile/{userId}" : {
            get : {
                tags: ["users"],
                summary : "get the user profile",
                responses: {
                    "200": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/UserProfileModel'
                                }
        
                            }
                        }
                    },
                    "400": {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/blog/create" : {
            post : {
                tags: ["Blog"],
                summary : "create a blog under logged in user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: '#/components/schemas/BlogCreate'
                            }

                        }
                    }
                },
                responses: {
                    "200": {
                        description: "successfully created",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/BlogCreate'
                                }
        
                            }
                        }
                    },
                    "403": {
                        description: "user must be logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/blogs" : {
            get : {
                tags: ["Blog"],
                summary : "Get all the blogs created by the user logged in",
                responses: {
                    "200": {
                        description: "successfull",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/BlogModel'
                                }
        
                            }
                        }
                    },
                    "403": {
                        description: "user must be logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/blog/{blogId}" : {
            get : {
                tags: ["Blog"],
                summary : "Get all the blog by ID",
                "parameters": [
                    {
                        "name": "blogId",
                        "in": "path",
                        "description": "blog Id that identifies which blog to fetch",
                        "required": true,
                        "type": "string"
                    },
                ],
                responses: {
                    "200": {
                        description: "successfull",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/BlogModel'
                                }
        
                            }
                        }
                    },
                    "403": {
                        description: "user must be logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/blog/update/{blogId}" : {
            put : {
                tags: ["Blog"],
                summary : "update blog by ID",
                "parameters": [
                    {
                        "name": "blogId",
                        "in": "path",
                        "description": "blog Id that identifies which blog to update",
                        "required": true,
                        "type": "string"
                    },
                ],
                responses: {
                    "200": {
                        description: "successfull",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/BlogCreate'
                                }
        
                            }
                        }
                    },
                    "403": {
                        description: "user must be logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
        "/api/blog/delete/{blogId}" : {
            delete : {
                tags: ["Blog"],
                summary : "delete blog by ID",
                "parameters": [
                    {
                        "name": "blogId",
                        "in": "path",
                        "description": "blog Id that identifies which blog to delete",
                        "required": true,
                        "type": "string"
                    },
                ],
                responses: {
                    "200": {
                        description: "successfull",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/BlogResponseMessage'
                                }
        
                            }
                        }
                    },
                    "403": {
                        description: "user must be logged in",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: '#/components/schemas/InvalidResponse'
                                }
        
                            }
                        }
                    }
                }
            }
        },
    }
}