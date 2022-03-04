### MongoDB schema validation

Validation template:

```js
{
    $jsonSchema: {
        title: 'collection-name',
        description: '',
        bsonType: 'object',
        required: [
            '_id',
            'someField',
        ],
        properties: {
            _id: {
                bsonType: 'int',
                description: '_id must be a unique integer and is required',
                minimum: 1
            },
            someField: {
                bsonType: 'string',
                description: 'someField description and is required'
                minLength: 4,
                maxLength: 15
            },
        },
        additionalProperties: false
    }
}
```

---

users collection:

```js
{
    $jsonSchema: {
        title: 'users',
        description: 'Users for all protected pages of rmlbb.com',
        bsonType: 'object',
        required: [
            '_id',
            'username',
            'password',
            'email',
            'role',
            'active',
            'posts',
            'registeredDate'
        ],
        properties: {
            _id: {
                bsonType: 'int',
                description: '_id must be a unique integer and is required',
                minimum: 1
            },
            username: {
                bsonType: 'string',
                description: 'username must be a string from 4 to 15 characters in length and is required',
                minLength: 4,
                maxLength: 15
            },
            password: {
                bsonType: 'string',
                description: 'The hashed version of the password must be a string, 60 characters in length and is required',
                minLength: 60,
                maxLength: 60
            },
            email: {
                bsonType: 'string',
                description: 'email must be a string and is required'
            },
            role: {
                bsonType: 'string',
                description: 'role is required and must be one of the predetermined string values',
                'enum': [
                    'user',
                    'admin'
                ]
            },
            active: {
                bsonType: 'bool',
                description: 'active status must be a boolean and is required'
            },
            posts: {
                bsonType: 'int',
                description: 'posts must be a positive integer and is required',
                minimum: 0
            },
            registeredDate: {
                bsonType: 'date',
                description: 'registeredDate must be a valid ISO Date and is required'
            },
            resetPasswordEXpires: {
                bsonType: 'date',
                description: 'resetPasswordEXpires, when included, must be a valid ISO Date'
            },
            resetPasswordToken: {
                bsonType: 'string',
                description: 'resetPasswordToken, when included, must be a string and 40 characters in length',
                minLength: 40,
                maxLength: 40
            }
        },
        additionalProperties: true
    }
}
```

forums collection:

```js
{
    $jsonSchema: {
        title: 'forums',
        description: 'Forum documents for the message board at rmlbb.com',
        bsonType: 'object',
        required: [
            '_id',
            'name',
            'active',
            'order',
            'topics',
            'posts',
            'lastPost'
        ],
        properties: {
            _id: {
                bsonType: 'int',
                description: '_id must be a unique integer and is required',
                minimum: 1
            },
            name: {
                bsonType: 'string',
                description: 'name must be a string from 1 to 50 characters in length and is required',
                minLength: 1,
                maxLength: 50
            },
            active: {
                bsonType: 'bool',
                description: 'active status must be a boolean and is required'
            },
            order: {
                bsonType: 'int',
                description: 'order must be a positive integer and is required',
                minimum: 1
            },
            topics: {
                bsonType: 'int',
                description: 'topics must be a positive integer and is required',
                minimum: 0
            },
            posts: {
                bsonType: 'int',
                description: 'posts must be a positive integer and is required',
                minimum: 0
            },
            lastPost: {
                bsonType: 'object',
                description: 'lastPost must be an object, but can be an empty object if there are no topics in a forum',
                properties: {
                    topicId: {
                        bsonType: 'int',
                        description: 'topicId must be a positive integer and is required',
                        minimum: 1
                    },
                    replyId: {
                        description: 'replyId must be a positive integer and is required',
                        oneOf: [
                            {
                                bsonType: 'int',
                                minimum: 1
                            },
                            {
                                bsonType: 'null'
                            }
                        ]
                    },
                    subject: {
                        bsonType: 'string',
                        description: 'subject must be a string from 1 to 50 characters in length and is required',
                        minLength: 1,
                        maxLength: 50
                    },
                    username: {
                        bsonType: 'string',
                        description: 'username must be a string from 4 to 15 characters in length',
                        minLength: 1,
                        maxLength: 50
                    },
                    userId: {
                        bsonType: 'int',
                        description: 'userId must be a positive integer',
                        minimum: 1
                    },
                    date: {
                        bsonType: 'date',
                        description: 'resetPasswordEXpires, when included, must be a valid ISO Date'
                    }
                }
            }
        },
        additionalProperties: false
    }
}
```

topics collection:

```js

```

replies collection:

```js

```

---

counters collection:

```js
{
    $jsonSchema: {
        title: 'counters',
        description: 'Keeps track of the next available _id for the message board at rmlbb.com',
        bsonType: 'object',
        required: [
            '_id',
            'value',
        ],
        properties: {
            _id: {
                bsonType: 'string',
                description: '_id must be a unique string with a singular collection name followed by _id and is required',
                minLength: 4
            },
            value: {
                bsonType: 'int',
                description: 'value must be a positive integer and is required',
                minimum: 1
            },
        },
        additionalProperties: false
    }
}
```

---
