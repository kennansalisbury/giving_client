import React from 'react'

const ProgramItem = props => {

    const handleChange = (e) => {
        props.counts[props.item.id] = parseInt(e.currentTarget.value)
        console.log('🌷🌷🌷🌷', props.counts)
        props.setCounts(props.counts)
    }

    if(props.cartShowing) {
        return (
            <div>
            <label>
                <input className="number-select" type="number" min="0" max="100" value={props.counts[props.item.id]} disabled/>
                {props.item.name} ${props.item.cost}
            </label>
        </div>
        )
    }

    return (
        <div>
        <label>
            <input className="number-select" type="number" min="0" max="100" onChange={e => handleChange(e)}/>
            {props.item.name} ${props.item.cost}
            
        </label>
    </div>

    )
}

export default ProgramItem