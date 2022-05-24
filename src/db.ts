import dbs from './dbs'
const db = dbs[process.env.DB_TYPE]
const dbTableName = 'weatherdata'

const dbFunctions = {
  knex: {
    insertWeatherData: async weatherData => db.connection(dbTableName).insert(weatherData),
    listWeatherData: async () => db.connection(dbTableName).select(['time', 'temp', 'wind']).orderBy('time', 'desc').limit(100),
    setup: async () => {
      if(!await db.connection.schema.hasTable(dbTableName)) {
        await db.connection.schema.createTable(dbTableName, (table) => {
          table.increments('id').primary();
          table.string('time', 22);
          table.float('temp');
          table.float('wind')
        });
      }
    }
  },
  mongodb: {
    insertWeatherData: async weatherData => {
      const mongo = await db.connection()
      return mongo.collection(dbTableName).insertOne({...weatherData})
    },
    listWeatherData: async () => {
      const mongo = await db.connection()
      return mongo.collection(dbTableName).find({}, {projection: { _id: 0 }}).sort({ time: -1 }).limit(100).toArray()
    }
  },
  redis: {
    insertWeatherData: async weatherData => {
      const redis = await db.connection()
      return redis.set(dbTableName, JSON.stringify(weatherData))
    },
    listWeatherData: async () => {
      const redis = await db.connection()
      return redis.get(dbTableName).then(result => JSON.parse(result))
    }
  }
}

export default dbFunctions[db.type]