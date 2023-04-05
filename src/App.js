import { useState,useEffect } from "react";

import Content from "./components/content";
import Search from "./components/search";

import getWeather from "./API/Weather";

function App() {

  const [data,setData] = useState([])

  useEffect(()=>{
   startSearch("Heidelberg")
},[])

  async function startSearch(cityName){
    //cb for search component
    
    //start the whole search api thing
    const data = await getWeather(cityName)
    setData(data)
  }


  return (
    <div>
      <Search search={startSearch}/>
      <Content data={data}/>
    </div>
  );
}

export default App;
