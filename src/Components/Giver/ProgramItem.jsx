import React, {useState, useEffect} from 'react'

const ProgramItem = props => {
    
    // let [cost, setCost] = useState(0)
    // let [totalNum, setTotalNum] = useState(0)

    const handleChange = (e) => {
        props.counts[props.item.id] = parseInt(e.currentTarget.value)
        console.log('🌷🌷🌷🌷', props.counts)
        props.setCounts(props.counts)

        // console.log('setting cost for this item to', props.item.cost * e.currentTarget.value)
        // setCost(props.item.cost * e.currentTarget.value)
        // setTotalNum(e.currentTarget.value)
        // props.setToPurchase([...props.toPurchase, {
        //     name: props.item.name,
        //     num_purchased: totalNum,
        //     dollars_spent: cost,
        //     userId: props.userId,
        //     programItemId: props.item.programItemId
        // }])
    }

    // useEffect(() => {
    //     props.totalEverything(cost)
    // }, [props.readyToTotal])
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
           {/* <FormControl className={classes.margin}>
            <InputLabel id="demo-customized-select-label">Age</InputLabel>
            <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={age}
            onChange={handleChange}
            input={<BootstrapInput />}
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl> */}
    </div>

    )
}

export default ProgramItem