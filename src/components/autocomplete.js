import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';

function Autocomplete(props){
    const {name,cb} = props
    return(
        <div onClick={cb} className="autocomplete">
            <Icon className="autoGlasses" path={mdiMagnify} size={1} />
            {name}
        </div>
    )
}

export default Autocomplete