import { useState} from "react";

import getCityData from "../API/Weather"
import getAutoData from "../API/autoComplete"

import Autocomplete from "./autocomplete";

function Search(){

    const [input,setInput] = useState("")
    const [auto,setAuto] = useState([])

    async function handleChange(e){
        //handle State
        setInput(e.target.value)
        //auto complete
        autoComplete(e.target.value)
        
    }
    async function autoComplete(input = input){
        //autocomplete input string

        //fetch data
        const data = await getAutoData(input)
        const arr = []
        data.features.forEach((d) => {
            let prop = d.properties
            arr.push(prop)
        })

        //get city names without duplicates
        const cityNameArray = arr.map((ob) => ob.city)
        const singleValues = new Set(cityNameArray)

        //setState to get the rerender 
        setAuto([...singleValues])
    }

    async function getLocations(){
        //use weather API with input value to find possible Locations
    }

    return (
        <div>
            <input onChange = {handleChange}  type="text"  placeholder="City?"></input>
            <button type ="button" onClick = {autoComplete}>AutoCompelte</button>
            <button type="button" onClick={getLocations}>Gib Mir Wätta</button>
            <div>
                {auto.map((name) => {return (<Autocomplete key={name} name = {name}/>)})}
            </div>
        </div>
    )
}

export default Search   