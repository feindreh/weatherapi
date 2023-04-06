import "../style/Content.css"

import Icon from "@mdi/react";
import { mdiThermometerLines,mdiWaves,mdiWeatherWindy, mdiNavigation } from '@mdi/js';
import { makeIconUrl } from "../API/Weather";

import {KelvinToCelsius,msToKmh,allUpper,getTime} from "../utility"

import { useState } from "react";

import Search from "./search"
import { useEffect } from "react";

function Content(props){
   const {search,data} = props 
   const{name,sys,main,weather,wind,timezone} = data
   const [date,setDate] = useState(getTime(0))
    

    useEffect(()=>{
        const Interval = setInterval(()=>{
            setDate(getTime(timezone))
        },500)

        return function (){clearInterval(Interval)}
    },[timezone])





    if(name === undefined){
        return(
            <>Loading ....</>
        )
    }
  
    return (
        <div id="content">
            <div className="flexContainer left">
                <div className="location">
                    <div className="description">{allUpper(weather[0].description)}</div>
                    <div className="name">{name} {sys.country}</div>
                    <div className="date">{date.weekday}, {date.month} {date.day} {date.year}</div>
                    <div>{date.time}</div>
                </div>
                <Search search={search}/>
                <div className="temp">{KelvinToCelsius(main.temp)} °C</div>
                <img className = "weatherIcon" alt={weather[0].main} src={makeIconUrl(weather[0].icon)}></img>
                
            </div>
            <div className="flexContainer right">

                <div className="data">
                    <Icon className="icon" path={mdiThermometerLines} size={1} />
                    <div className="valueWrap">
                        <div className="text">
                            Feelslike
                        </div>
                        <div className="value">
                            {KelvinToCelsius(main.feels_like)} °C
                        </div>
                    </div>
                </div>
                
                <div className="data">
                    <Icon className="icon" path={mdiWaves} size={1} />
                    <div className="valueWrap">
                        <div className="text">
                            Humidity
                        </div>
                        <div className="value">
                            {main.humidity} %
                        </div>
                    </div>
                </div>
                <div className="data">
                    <Icon className="icon" path={mdiWeatherWindy} size={1} />
                    <div className="valueWrap">
                        <div className="text">
                            Windspeed 
                        </div>
                        <div className="value">
                            {msToKmh(wind.speed)}/kmh
                        </div>
                    </div>
                </div>
                <div className="data">
                    <Icon className="icon" path={mdiNavigation} size={1} />
                    <div className="valueWrap">
                        <div className="text">
                            Direction
                        </div>
                        <div className="value">
                            {wind.deg}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content