import { useState,useRef,useEffect} from "react";

import getCityData from "../API/Weather"
import getAutoData from "../API/autoComplete"

import Autocomplete from "./autocomplete";

function Search(){

    const inputRef = useRef()
    const [auto,setAuto] = useState([])
    const [timer,setTimer] = useState(null)

    useEffect(() => {
        //clear timer on unmount
        return () => clearTimeout(timer);
      }, [timer]);
    
    async function handleChange(e){
        //clear auto then reset a timer and start it to find new autocompletes
        // ==> we will only get autocompletes if we stop typing for some time
        // ==> saves alot of api calls

        //setAuto([])
        AutoCompelteTimer(e.target.value)
        
    }
    function AutoCompelteTimer(string){
        //clear timer and start it again to get autocompletes after some time
        clearTimeout(timer)
        setTimer(setTimeout(()=>{
            autoComplete(string)
        },250)) 
    }
    async function autoComplete(input){
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