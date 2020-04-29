const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
let db;

const mongodbConnect = async () => {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db();
    return db;
};

const getDb = () => db;

module.exports = { mongodbConnect, getDb };
