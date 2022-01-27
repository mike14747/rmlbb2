### MongoDB schema validation

users:

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
        bsonType: 'objectId',
        description: '_id must be an objectId and is required.'
      },
      username: {
        bsonType: 'string',
        minLength: 6,
        maxLength: 15,
        description: 'username must be a string from 6 to 15 characters in length and is required.'
      },
      password: {
        bsonType: 'string',
        minLength: 60,
        maxLength: 60,
        description: 'The hashed version of the password must be a string, 60 characters in length and is required.'
      },
      email: {
        bsonType: 'string',
        description: 'email must be a string and is required.'
      },
      role: {
        bsonType: 'string',
        'enum': [
          'user',
          'admin'
        ],
        description: 'role is required and must be one of the predetermined string values.'
      },
      active: {
        bsonType: 'bool',
        description: 'active status must be a boolean and is required.'
      },
      posts: {
        bsonType: 'int',
        description: 'posts must be an integer and is required.'
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
        minLength: 40,
        maxLength: 40,
        description: 'resetPasswordToken, when included, must be a string and 40 characters in length.'
      }
    },
    additionalProperties: true
  }
}
```