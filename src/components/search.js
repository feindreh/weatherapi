import { useState,useRef} from "react";

import getAutoData from "../API/autoComplete"

import Autocomplete from "./autocomplete";

import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';



import "../style/search.css"

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
        if(input === ""){return}
        
        inputRef.current.value = ""
        setAuto([])

        search(input)
    }
    function AutoCompelteTimer(string){
        //clear timer and start it again to get autocompletes after some time
        clearTimeout(timer)
        setTimer(setTimeout(()=>{
            autoComplete(string)
        },180)) 
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
            <div className = "searchBar">
                <input className = "input" ref={inputRef} onChange = {(e)=>{ AutoCompelteTimer(e.target.value)}}  type="text"  placeholder="Search City ..."></input>
                <Icon className="glasses" onClick={handleButton} path={mdiMagnify} size={1} />
            </div>
            <div>
                {auto.map((name) => {return (<Autocomplete key={name} name = {name} cb={()=>{autoSelected(name)}}/>)})}
            </div>
        </div>
    )
}

export default Search   