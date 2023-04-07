import "./style/reset.css"
import "./style/App.css"

import { useState,useEffect} from "react";

import Content from "./components/content";

import getWeather from "./API/Weather";

import day from "./img/day.svg"
import dawn from "./img/dawn.svg"
import night from "./img/night.svg"
import forest from "./img/forest.jpg"

import { getTime } from "./utility";

function App() {


  const [data,setData] = useState({})
  const [backGround,setBackGround] = useState(forest)

  const root = document.querySelector("#root")
  
  function changeColor(color){
    if(color === "light"){
      root.style.setProperty('--light', "white");
      root.style.setProperty('--dark', "#0e1022");
    }
    if(color === "dark"){
      root.style.setProperty('--light', "#0e1022");
      root.style.setProperty('--dark', "white");
    }
  }

  function changeBackGround(time){
    if(time <6 || time > 20){
      changeColor("light")
      return night
    }
    if(time < 16 && time > 8){
      changeColor("dark")
      return day
    }
    changeColor("light")
    return dawn
  }


  useEffect(()=>{
   startSearch("Heidelberg")
},[])

  async function startSearch(cityName,cb){
    setData({})
    //cb for search component
    
    //start the whole search api thing
    const data = await getWeather(cityName)
    setData(data)
    const hour = +getTime(data.timezone).time.slice(0,2)
    setBackGround(changeBackGround(hour))
  }

  return (
    <div style={{"backgroundImage" : `urL(${backGround})`}} id="App">
      <Content data={data} search={startSearch}/>
    </div>
  );
}

export default App;
