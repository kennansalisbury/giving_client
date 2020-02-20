import React from 'react'
import Input from '@material-ui/core/Input'

const ProgramItem = props => {

    const handleChange = (e) => {
        //set counts to the current values of the inputs
        props.counts[props.item.id] = parseInt(e.currentTarget.value)
        props.setCounts(props.counts)
        
    }

    if(props.cartShowing) {
        return (
            <div>
            <label>
                <Input className="number-select" type="number" inputProps={{min:"0", max:"100"}}  value={props.counts[props.item.id]} disabled/>
                {props.item.name} ${props.item.cost}
            </label>
        </div>
        )
    }

    return (
        <div>
        <label>
            <Input className="number-select" type="number" inputProps={{min:"0", max:"100"}} onChange={e => handleChange(e)}/>
            {props.item.name} ${props.item.cost}
            
        </label>
    </div>

    )
}

export default ProgramItem