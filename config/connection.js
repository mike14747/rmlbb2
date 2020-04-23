const MongoClient = require('mongodb').MongoClient;
// or
// const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'rmlbb2';

async function connection() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(dbName);

        // console.log(db.databaseName);
        // const collections = await db.collections();
        // collections.forEach(collection => console.log(collection.collectionName));

        const result = await db.collection('teams').find().toArray();
        console.log(result);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

connection();
