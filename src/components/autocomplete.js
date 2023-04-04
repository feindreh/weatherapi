import "../style/autocomplete.css"

function Autocomplete(props){
    const {city} = props
    return(
        <div className="autocomplete">
            <div>{city.city}</div>
            <div>{city.country}</div>
        </div>
    )
}

export default Autocomplete