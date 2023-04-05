import { useState,useRef,useEffect} from "react";

import getAutoData from "../API/autoComplete"

import Autocomplete from "./autocomplete";

function Search(props){

    const {search} = props

    const inputRef = useRef()
    const [auto,setAuto] = useState([])
    const [timer,setTimer] = useState(null)
    
    function handleButton(){
         //clear Autocomplets + Timer
         // call callback search from props with input value
        clearTimeout(timer);
        let input = inputRef.current.value
        
        inputRef.current.value = ""
        setAuto([])

        search(input)
    }
    function AutoCompelteTimer(string){
        //clear timer and start it again to get autocompletes after some time
        clearTimeout(timer)
        setTimer(setTimeout(()=>{
            autoComplete(string)
        },250)) 
    }
    async function autoComplete(input){
        //autocomplete input string with api
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
        const cityNameArray = arr.map((ob) => ob.city)
        const singleValues = new Set(cityNameArray)
        //setState to get the rerender 
        const returnValues = [...singleValues].filter((a) => { return a!==undefined})
        setAuto([...returnValues])
    }
    function autoSelected(cityName){
        //callback for Autocomplete component
        inputRef.current.value = cityName
        setAuto([])
    }

    return (
        <div>
            <input ref={inputRef} onChange = {(e)=>{ AutoCompelteTimer(e.target.value)}}  type="text"  placeholder="City?"></input>
            <button type="button" onClick={handleButton}>Wetter rausfinden</button>
            <div>
                {auto.map((name) => {return (<Autocomplete key={name} name = {name} cb={()=>{autoSelected(name)}}/>)})}
            </div>
        </div>
    )
}

export default Search   