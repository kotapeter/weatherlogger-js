import axios from 'axios'
import moment from 'moment'

export default async function () {
  const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${process.env.WEATHER_LOCATION}&appid=${process.env.OPENWEATHER_KEY}&units=${process.env.UNIT}`);
  return {
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      temp: weather.data.main.temp,
      wind: weather.data.wind.speed
  }
}
