import {weatherAPI as key} from "./key";

function createWeatherURL(lat,lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  }

function createGPSURL(city) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=${key}`;
  }

function makeIconUrl(iconName){
    return `https://openweathermap.org/img/wn/${iconName}@2x.png`
}


async function getWeather(cityName){
  //handle the weather API
  console.log("get Weather from",cityName)
  //build url and get city gps
  const gpsUrl = createGPSURL(cityName)
  const gpsRes = await fetch(gpsUrl)
  const gpsData = await gpsRes.json()
  const {lat,lon} = gpsData[0]
  
  //build url and get city weather
  const weatherUrl = createWeatherURL(lat,lon)
  const weatherRes = await fetch(weatherUrl)
  const weatherData = await weatherRes.json()

  return weatherData

}

export default getWeather