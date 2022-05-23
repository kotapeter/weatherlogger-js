import dbs from './dbs'
const db = dbs[process.env.DB_TYPE]

const dbFunctions = {
  knex: {
    insertWeatherData: async weatherData => db.connection(process.env.DB_TABLE).insert(weatherData),
    listWeatherData: async () => db.connection(process.env.DB_TABLE).select(['time', 'temp', 'wind']).orderBy('time', 'desc').limit(100),
    setup: async () => {
      if(!await db.connection.schema.hasTable(process.env.DB_TABLE)) {
        await db.connection.schema.createTable(process.env.DB_TABLE, (table) => {
          table.increments('id').primary();
          table.string('time', 22);
          table.float('temp', 2);
          table.float('wind', 2);
        });
      }
    }
  },
  mongodb: {
    insertWeatherData: async weatherData => {
      const mongo = await db.connection()
      return mongo.collection(process.env.DB_TABLE).insertOne({...weatherData})
    },
    listWeatherData: async () => {
      const mongo = await db.connection()
      return mongo.collection(process.env.DB_TABLE).find({}, {projection: { _id: 0 }}).sort({ time: -1 }).limit(100).toArray()
    }
  },
  redis: {
    insertWeatherData: async weatherData => {
      const redis = await db.connection()
      return redis.set(process.env.DB_TABLE, JSON.stringify(weatherData))
    },
    listWeatherData: async () => {
      const redis = await db.connection()
      return redis.get(process.env.DB_TABLE).then(result => JSON.parse(result))
    }
  }
}

export default dbFunctions[db.type]