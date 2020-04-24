const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017/rmlbb2';

async function connect(url) {
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    return client.db();
}

async function conn() {
    const db = await connect(uri).catch(error => console.log(error));
    return db;
}

// module.exports = async function () {
//     const db = await connect(uri).catch(error => console.log(error));
//     return db;
// };

module.exports = conn;
