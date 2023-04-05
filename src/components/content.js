import "../style/Content.css"

import {KelvinToCelsius,msToKmh} from "../utility"

import Search from "./search"

function Content(props){
   const {search,data} = props 
   const{name,sys,main,weather,wind} = data

    if(name === undefined){
        return(
            <>Loading ....</>
        )
    }
    return (
        <div id="content">
            <div className="flexContainer">
                <div>{weather[0].description}</div>
                <div>{name} {sys.country}</div>
                <div>Datum ?</div>
                <div>{KelvinToCelsius(main.temp)} °C</div>
                <div>{weather[0].icon}</div>
                <Search search={search}/>
            </div>
            <div className="flexContainer">
                <div>Feelslike: {KelvinToCelsius(main.feels_like)} °C</div>
                <div>Humidity: {main.humidity} %</div>
                <div>Windspeed: {msToKmh(wind.speed)}/kmh</div>
                <div>Direction: {wind.deg}</div>
            </div>
        </div>
    )
}

export default Content