const db = require('../config/connection').getDb();
const ObjectID = require('mongodb').ObjectID;

const Team = {
    getTeams: async () => {
        try {
            const result = await db.collection('teams').find({}).toArray();
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
    getOneTeam: async (id) => {
        try {
            const result = await db.collection('teams').find({ _id: ObjectID(id) }).toArray();
            return [true, result];
        } catch (error) {
            return [false, error];
        }
    },
};

module.exports = Team;
