import "../style/Content.css"

import Icon from "@mdi/react";
import { mdiThermometerLines,mdiWaves,mdiWeatherWindy, mdiNavigation } from '@mdi/js';

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