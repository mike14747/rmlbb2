import { connectToDatabase } from '../../utils/mongodb';

export async function getNextId(idName) {
    const { db } = await connectToDatabase();

    try {
        const nextId = await db
            .collection('counters')
            .findOneAndUpdate({ _id: idName }, { $inc: { value: 1 } }, { upsert: false, returnNewDocument: false });
        return nextId?.value?.value;
    } catch (error) {
        console.log(error);
        return null;
    }
}
