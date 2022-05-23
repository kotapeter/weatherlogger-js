require('dotenv').config()
import db from '../src/db'

async function execute() {
    const weatherData = await db.listWeatherData()
    if(process.env.DB_TYPE === 'redis') {
        console.log(`Most recent measurement from the ${process.env.DB_TYPE} database:`)
    } else {
        console.log(`Most recent 100 measurements from the ${process.env.DB_TYPE} database:`)
    }
    console.log(weatherData)
    process.exit()
}

execute()
