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

