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
                description: 'must be a unique positive integer and is required',
                minimum: 1
            },
            someField: {
                bsonType: 'string',
                description: 'someField description and is required',
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
                description: 'must be a unique positive integer and is required',
                minimum: 1
            },
            username: {
                bsonType: 'string',
                description: 'must be a string from 4 to 15 characters in length and is required',
                minLength: 4,
                maxLength: 15
            },
            password: {
                bsonType: 'string',
                description: 'must be a string (hashed version), 60 characters in length and is required',
                minLength: 60,
                maxLength: 60
            },
            email: {
                bsonType: 'string',
                description: 'must be a string and is required'
            },
            role: {
                bsonType: 'string',
                description: 'must be one of the predetermined string values and is required',
                'enum': [
                    'user',
                    'admin'
                ]
            },
            active: {
                bsonType: 'bool',
                description: 'must be a boolean and is required'
            },
            posts: {
                bsonType: 'int',
                description: 'must be a non-negative integer and is required',
                minimum: 0
            },
            registeredDate: {
                bsonType: 'date',
                description: 'must be a valid ISO Date and is required'
            },
            resetPasswordEXpires: {
                bsonType: 'date',
                description: 'when included, it must be a valid ISO Date'
            },
            resetPasswordToken: {
                bsonType: 'string',
                description: 'when included, it must be a string and 40 characters in length',
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
                description: 'must be a unique positive integer and is required',
                minimum: 1
            },
            name: {
                bsonType: 'string',
                description: 'must be a string from 1 to 50 characters in length and is required',
                minLength: 1,
                maxLength: 50
            },
            active: {
                bsonType: 'bool',
                description: 'must be a boolean and is required'
            },
            order: {
                bsonType: 'int',
                description: 'must be a positive integer and is required',
                minimum: 1
            },
            topics: {
                bsonType: 'int',
                description: 'must be a non-negative integer and is required',
                minimum: 0
            },
            posts: {
                bsonType: 'int',
                description: 'must be a non-negative integer and is required',
                minimum: 0
            },
            lastPost: {
                bsonType: 'object',
                description: 'must be an object, but can be an empty object if there are no topics in a forum',
                properties: {
                    topicId: {
                        bsonType: 'int',
                        description: 'must be a positive integer if it exists',
                        minimum: 1
                    },
                    replyId: {
                        description: 'must be a positive integer or null if there are no replies to the topic',
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
                        description: 'must be a string from 1 to 50 characters in length if it exists',
                        minLength: 1,
                        maxLength: 50
                    },
                    username: {
                        bsonType: 'string',
                        description: 'must be a string from 4 to 15 characters in length if it exists',
                        minLength: 1,
                        maxLength: 50
                    },
                    userId: {
                        bsonType: 'int',
                        description: 'must be a positive integer if it exists',
                        minimum: 1
                    },
                    date: {
                        bsonType: 'date',
                        description: 'when included, it must be a valid ISO Date if it exists'
                    }
                }
            }
        },
        additionalProperties: false
    }
}
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
                description: 'must be a unique string with a singular collection name followed by _id and is required',
                minLength: 4
            },
            value: {
                bsonType: 'int',
                description: 'must be a positive integer and is required',
                minimum: 1
            },
        },
        additionalProperties: false
    }
}
```

---

topics collection:

```js
{
    $jsonSchema: {
        title: 'topics',
        description: 'Topics documents for the message board at rmlbb.com',
        bsonType: 'object',
        required: [
            '_id',
            'title',
            'content',
            'forum_id',
            'forumName',
            'user_id',
            'username',
            'date',
            'lastEditDate',
            'views',
            'replies',
            'forumActive',
            'active',
            'lastReply'
        ],
        properties: {
            _id: {
                bsonType: 'int',
                description: 'must be a unique positive integer and is required',
                minimum: 1
            },
            title: {
                bsonType: 'string',
                description: 'must be a string from 1 to 50 characters in length and is required',
                minLength: 1,
                maxLength: 50
            },
            content: {
                bsonType: 'string',
                description: 'must be a string from 1 to 10000 characters in length and is required',
                minLength: 1,
                maxLength: 25000
            },
            forum_id: {
                bsonType: 'int',
                description: 'must be a unique positive integer and is required',
                minimum: 1
            },
            forumName: {
                bsonType: 'string',
                description: 'must be a string from 1 to 50 characters in length and is required',
                minLength: 1,
                maxLength: 50
            },
            user_id: {
                bsonType: 'int',
                description: 'must be a unique positive integer and is required',
                minimum: 1
            },
            username: {
                bsonType: 'string',
                description: 'must be a string from 4 to 15 characters in length and is required',
                minLength: 4,
                maxLength: 15
            },
            date: {
                bsonType: 'date',
                description: 'must be a valid ISO Date'
            },
            lastEditDate: {
                bsonType: ['date', 'null'],
                description: 'must be a valid ISO Date but can be null'
            },
            views: {
                bsonType: 'int',
                description: 'must be a non-negative integer and is required',
                minimum: 0
            },
            replies: {
                bsonType: 'array',
                description: 'must be an array of positive integers, but can be an empty array',
                items: {
                    bsonType: 'int',
                    description: 'must be a unique positive integer',
                    minimum: 1
                },
                uniqueItems: true,
                minItems: 0
            },
            forumActive: {
                bsonType: 'bool',
                description: 'must be a boolean and is required'
            },
            active: {
                bsonType: 'bool',
                description: 'must be a boolean and is required'
            },
            lastReply: {
                bsonType: 'object',
                description: 'must be an object, but can be an empty object if there are no replies to the topic',
                properties: {
                    replyId: {
                        bsonType: 'int',
                        description: 'must be a positive integer if it exists',
                        minimum: 1
                    },
                    subject: {
                        bsonType: 'string',
                        description: 'must be a string from 1 to 50 characters in length if it exists',
                        minLength: 1,
                        maxLength: 50
                    },
                    username: {
                        bsonType: 'string',
                        description: 'username must be a string from 4 to 15 characters in length if it exists',
                        minLength: 1,
                        maxLength: 50
                    },
                    userId: {
                        bsonType: 'int',
                        description: 'must be a positive integer if it exists',
                        minimum: 1
                    },
                    date: {
                        bsonType: 'date',
                        description: 'when included, it must be a valid ISO Date if it exists'
                    }
                }
            }
        },
        additionalProperties: false
    }
}
```

---

replies collection:

```js
{
  $jsonSchema: {
    title: 'replies',
    description: 'Replies documents for the message board at rmlbb.com',
    bsonType: 'object',
    required: [
      '_id',
      'subject',
      'content',
      'forum_id',
      'forumName',
      'forumActive',
      'user_id',
      'username',
      'topic_id',
      'topicActive',
      'date',
      'lastEditDate'
    ],
    properties: {
      _id: {
        bsonType: 'int',
        description: 'must be a unique positive integer and is required',
        minimum: 1
      },
      subject: {
        bsonType: 'string',
        description: 'must be a string from 1 to 50 characters in length and is required',
        minLength: 1,
        maxLength: 50
      },
      content: {
        bsonType: 'string',
        description: 'must be a string from 1 to 10000 characters in length and is required',
        minLength: 1,
        maxLength: 25000
      },
      forum_id: {
        bsonType: 'int',
        description: 'must be a unique positive integer and is required',
        minimum: 1
      },
      forumName: {
        bsonType: 'string',
        description: 'must be a string from 1 to 50 characters in length and is required',
        minLength: 1,
        maxLength: 50
      },
      forumActive: {
        bsonType: 'bool',
        description: 'must be a boolean and is required',
      },
      user_id: {
        bsonType: 'int',
        description: 'must be a unique positive integer and is required',
        minimum: 1
      },
      username: {
        bsonType: 'string',
        description: 'must be a string from 4 to 15 characters in length and is required',
        minLength: 4,
        maxLength: 15
      },
      topic_id: {
        bsonType: 'int',
        description: 'must be a unique positive integer and is required',
        minimum: 1
      },
      topicActive: {
        bsonType: 'bool',
        description: 'must be a boolean and is required',
      },
      date: {
        bsonType: 'date',
        description: 'must be a valid ISO Date'
      },
      lastEditDate: {
        bsonType: [
          'date',
          'null'
        ],
        description: 'must be a valid ISO Date but can be null'
      }
    },
    additionalProperties: false
  }
}
```

---
