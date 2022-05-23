require('dotenv').config()
import express from 'express'
import tableify from 'tableify'
import db from '../src/db'
const app = express()

app.get('/', async (req, res) => {
  const weatherData = await db.listWeatherData()
  const table = tableify(weatherData)
  res.send(table)
})

app.listen(process.env.PORT, () => {
  console.log("Weather server is up and running")
})
