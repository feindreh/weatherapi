import "../style/autocomplete.css"

function Autocomplete(props){
    const {name,cb} = props
    return(
        <div onClick={cb}className="autocomplete">
            {name}
        </div>
    )
}

export default Autocomplete