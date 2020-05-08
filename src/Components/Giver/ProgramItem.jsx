import React, {useState, useEffect} from 'react'
import Input from '@material-ui/core/Input'
import IndividualItemBar from './Charts/IndividualItemBar'
import { Grid } from '@material-ui/core'

const ProgramItem = props => {
    // console.log(props)


    // let [totalItemPurchased, setTotalItemPurchased] = useState(0)
    // let [tempCounts, setTempCounts] = useState(0)
    let [dataForChart, setDataForChart] = useState([])

    // const getTotalItemPurchased = () => {
    //     let total=0
    //     props.item.giverItems.forEach(item => total += item.num_purchased)
    //     setTotalItemPurchased(total)
    // }

    useEffect(() => {
        formatDataForChart()
    }, [props.counts])

    const formatDataForChart = (tempCount) => {
        let total=0
        props.item.giverItems.forEach(item => total += item.num_purchased)
        // setTotalItemPurchased(total)
        
        let currentNum
        if(tempCount){
            currentNum = total += tempCount
        }
        else {
            currentNum= total
        }
        // console.log('CURRENT NUM', currentNum)

        let data = [
            {
                name: 'Item', 
                num: currentNum,
                togoal: props.item.goal_num - currentNum
            }
      ]
        setDataForChart(data)
 
    }

    // console.log('CHART DATA', dataForChart)

    const handleChange = (e) => {
        //set counts to the current values of the inputs
        let tempCount = (e.target.value ? parseInt(e.currentTarget.value) : 0)

        props.counts[props.item.id] = tempCount
        props.setCounts(props.counts)
        // console.log('COUNTS',props.counts)
        props.tempTotalCounts(props.counts)
        

        formatDataForChart(tempCount)
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
        
        <Grid
            container
            direction="row"
            justify="flex-start"
        >
            <Grid item xs={6} sm={6}>
                <label>
                    <Input className="number-select" type="number" inputProps={{min:"0", max:"100"}} onChange={e => handleChange(e)}/>
                    {props.item.name} ${props.item.cost}
                </label>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={5} sm={5}>
                <IndividualItemBar data={dataForChart} />
            </Grid>
        </Grid>
    

    )
}

export default ProgramItem