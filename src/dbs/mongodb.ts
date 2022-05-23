import { MongoClient } from 'mongodb'

const connection = async () => {
    const client = new MongoClient(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`)
    await client.connect()
    return client.db(process.env.DB_NAME)
}

export default {
    connection,
    type: 'mongodb'
}