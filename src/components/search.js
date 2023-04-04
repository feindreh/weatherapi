import { useState} from "react";

function Search(){

    const [input,setInput] = useState("")


    async function  handleChange(e){
        //handle State
        setInput(e.target.value)
        //google maps API => auto complete
    }

    async function handleClick(){
        //use weather API with input value to find weather
        console.log("Use Weather API with",input)
    }

    return (
        <div>
            <input onChange = {handleChange}  type="text"  placeholder="City?"></input>
            <button type="button" onClick={handleClick}>Gib Mir Wätta</button>
        </div>
    )
}

export default Search   