import { autoAPI as key } from "./key";

function makeAutoUrl(text){
  return `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&type=city&apiKey=${key}`
}

async function getAutoData(text){
  const URL = makeAutoUrl(text)
  const res = await fetch(URL)

  let result
  await res.json().then((data) => {result = data})

  return result

}

export default getAutoData