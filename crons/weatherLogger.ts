require('dotenv').config()
import { CronJob } from 'cron'
import getWeatherData from '../src/getWeatherData'
import db from '../src/db'

var job = new CronJob(`*/3 * * * *`, async () => {
  const weatherData = await getWeatherData()
  await db.insertWeatherData(weatherData)

  console.log("Weather data retrieved from the OpenWeatherMap API:")
  console.log(weatherData)
  console.log(`Weather data logged to ${process.env.DB_TYPE} database`)

}, null, true, 'America/Los_Angeles');

console.log('Starting weather logging')
job.start();
