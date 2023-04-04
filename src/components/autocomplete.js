import "../style/autocomplete.css"

function Autocomplete(props){
    const {name} = props
    return(
        <div className="autocomplete">
            {name}
        </div>
    )
}

export default Autocomplete