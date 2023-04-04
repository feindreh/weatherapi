import { useState,useRef} from "react";

import getCityData from "../API/Weather"
import getAutoData from "../API/autoComplete"

import Autocomplete from "./autocomplete";

function Search(){

    const inputRef = useRef()
    const [auto,setAuto] = useState([])

    async function handleChange(e){
        
        //auto complete
        autoComplete(e.target.value)
        
    }
    async function autoComplete(input = input){
        //autocomplete input string
        if(input.length < 3){
            //api doesnt support strings with less then 3 letters
            return
        }
        //fetch data
        const data = await getAutoData(input)
        const arr = []
        data.features.forEach((d) => {
            let prop = d.properties
            arr.push(prop)
        })
        //get city names without duplicates
        console.log(arr)
        const cityNameArray = arr.map((ob) => ob.city)
        const singleValues = new Set(cityNameArray)
        //setState to get the rerender 
        const returnValues = [...singleValues].filter((a) => { return a!==undefined})
        setAuto([...returnValues])
    }
    async function getLocations(){
        //use weather API with input value to find possible Locations
    }
    function autoSelected(cityName){
        inputRef.current.value = cityName
        setAuto([])
    }

    return (
        <div>
            <input ref={inputRef} onChange = {handleChange}  type="text"  placeholder="City?"></input>
            <button type="button" onClick={getLocations}>Wetter rausfinden</button>
            <div>
                {auto.map((name) => {return (<Autocomplete key={name} name = {name} cb={()=>{autoSelected(name)}}/>)})}
            </div>
        </div>
    )
}

export default Search   