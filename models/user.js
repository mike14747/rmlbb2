const db = require('../config/connectionPool').getDb();
const ObjectID = require('mongodb').ObjectID;

const User = {
    getUserById: async (paramsObj) => {
        const id = paramsObj.id;
        try {
            const result = await db.collection('users').find({ _id: ObjectID(id) }).toArray();
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getUserByUsername: async (paramsObj) => {
        const username = paramsObj.username;
        try {
            const result = await db.collection('users').find({ username: username }).toArray();
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    addNewUser: async (paramsObj) => {
        const document = {
            username: paramsObj.username,
            hashed_password: paramsObj.hashed_password,
            access_level: paramsObj.access_level,
            email: paramsObj.email,
        };
        try {
            const result = await db.collection('users').insertOne(document);
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = User;
