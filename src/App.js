import "./style/reset.css"
import "./style/App.css"

import { useState,useEffect } from "react";

import Content from "./components/content";

import getWeather from "./API/Weather";



function App() {

  const [data,setData] = useState({})

  useEffect(()=>{
   startSearch("Heidelberg")
},[])

  async function startSearch(cityName,cb){
    setData({})
    //cb for search component
    
    //start the whole search api thing
    const data = await getWeather(cityName)
    setData(data)
  }

  return (
    <div id="App">
      <Content data={data} search={startSearch}/>
      <div id="opacity"></div>
    </div>
  );
}

export default App;
