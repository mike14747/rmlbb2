import { connectToDatabase } from '../../utils/mongodb';

export async function getNextId(idName) {
    const { db } = await connectToDatabase();

    const nextId = db.counters.findAndModify({
        query: { _id: idName },
        update: { $inc: { value: 1 } },
        new: true,
    });
    return nextId.value;
}
