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
        const collections = await db.collections();
        // collections.forEach(collection => console.log(collection.collectionName));

        const teams = await db.collection('teams').find({ name: 'Blaze' });
        teams.forEach(team => console.log(team.name));

        // const teams = await db.collection('teams').find();
        // console.log(teams);

        // const cursor = db.collection('teams').find();
        // const result1 = await teams.find();
        // const result2 = await result1.toArray();
        // console.log(result2);
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}

connection();
