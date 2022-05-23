# Weather Logger

This is a small Node based weather data logging application, the purpose of which is to test deployment flows for Kinsta Application Hosting. Once running, the application will log the temperature and wind speed in a given location once every minute and allow you to view the last 100 entries on a web server. 

## Supported Databases
To be able to test multiple databases on Kinsta you can use environment variables to change the database used by the application (more on specific setup below). The following databases are supported: 
* MongoDB
* MySQL
* MariaDB
* PostreSQL
* Redis

## Getting an OpenWeatherMap Key
The app will require an API key from [OpenWeatherMap](https://home.openweathermap.org). If you sign up you can grab an API key for free that should allow you to make 1,000 API calls a day.  

## Local Setup
To test the project locally clone the repository and run `npm i` in the folder to install dependencies. Create a file named `.env` and paste the environment variables from the included `.env.example` file. 


# OpenWeatherMap Key - Go to https://openweathermap.org/ for a free key
OPENWEATHER_KEY=your-key
# Location to get weather for
WEATHER_LOCATION=paris
# Database type. Can be mariadb, mongodb, mysql, postgresql, redis
DB_TYPE=mysql
# Unit of measurement - metric or imperial
UNIT=metric
