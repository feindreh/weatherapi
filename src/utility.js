export function KelvinToCelsius(f){
    const c = (f-273.15).toFixed(0)
    return c
}

export function msToKmh(ms){
    return (ms*3.6).toFixed(0)
}

export function allUpper(string){
    const words = string.split(" ").map((word) => {
        return word[0].toUpperCase() + word.slice(1,word.length)
    })

    return words.join(" ")
}

export function getTime(timezone){

    const shift = (7200*1000) - (timezone*1000)
    const stamp = Date.now()
    const adjusted = stamp - shift

    const date = new Date(adjusted).toString()
    const results = date.split(" ")
    return {
        weekday:results[0],
        month: results[1],
        day: results[2],
        year:results[3],
        time:results[4]
    }

}

export function windFromDeg(deg){
    
    if(deg >= 337 || deg <= 23){
        return "N"
    }
    if(deg < 68){
        return "NO"
    }
    if(deg<112){
        return "O"
    }
    if(deg<157){
        return "SO"
    }
    if(deg<202){
        return "S"
    }
    if(deg<248){
        return "SW"
    }
    if(deg<293){
        return "W"
    }
        return "NW"
}
