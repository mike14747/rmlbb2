import clientPromise from '../mongodb';

export async function getNextId(idName) {
    const options = {
        upsert: false,
        returnNewDocument: false,
    };

    try {
        const connection = await clientPromise;
        const db = connection.db();

        const nextId = await db
            .collection('counters')
            .findOneAndUpdate({ _id: idName }, { $inc: { value: 1 } }, options);
        return nextId?.value?.value;
    } catch (error) {
        console.log(error);
        return null;
    }
}
