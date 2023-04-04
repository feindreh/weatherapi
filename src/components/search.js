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
        
    }
    async function autoComplete(e){
        //autocomplete input string
        const data = await getAutoData(input)
        const arr = []
        data.features.forEach((d) => {
            let prop = d.properties
            arr.push(prop)
        })
        setAuto(arr)
    }
    async function getLocations(e){
        //use weather API with input value to find possible Locations
    }

    return (
        <div>
            <input onChange = {handleChange}  type="text"  placeholder="City?"></input>
            <button type ="button" onClick = {autoComplete}>AutoCompelte</button>
            <button type="button" onClick={getLocations}>Gib Mir Wätta</button>
            <div>
                {auto.map((prop) => {return (<Autocomplete key={prop.place_id}city = {prop}/>)})}
            </div>
        </div>
    )
}

export default Search   