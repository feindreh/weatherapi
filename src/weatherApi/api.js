import key from "./key";

function createWeatherURL(lat,lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
  }

function createGPSURL(city) {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=${key}`;
  }

function makeIconUrl(iconName){
    return `https://openweathermap.org/img/wn/${iconName}@2x.png`
}

async function getCityData(name){
  
    const GPSURL = createGPSURL(name);
    const res = await fetch(GPSURL)

    let result
    await res.json().then((data) => {result = data})

    return result
}

export default getCityData