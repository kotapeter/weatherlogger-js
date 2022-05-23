require('dotenv').config()
import getWeatherData from '../src/getWeatherData'
import db from '../src/db'

async function execute() {
  const weatherData = await getWeatherData()
  await db.insertWeatherData(weatherData)
  console.log("Weather data retrieved from the OpenWeatherMap API:")
  console.log(weatherData)
  console.log(`Weather data logged to ${process.env.DB_TYPE} database`)

  process.exit()
}

execute()
