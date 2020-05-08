import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Moment from 'react-moment'

import ProgramDonut from './Charts/ProgramDonut'

const ProgramModule = props => {
    
    let [totalGoal, setTotalGoal] = useState('')
    let [totalPurchased, setTotalPurchased] = useState('')
    let [totalCurrentGiverPurch, setTotalCurrentGiverPurch] = useState('')
    let [dataForChart, setDataForChart] = useState([])


    const findTotalCurrentGiverPurch = () => {
        
        let total = []
        props.program.programItems.forEach(item => {
            props.giverItems.forEach(gi => {
                if(gi.programItemId === item.id) {
                    total.push(gi)
                }
            })
        })

        setTotalCurrentGiverPurch(total)
    }


    // to get total goal for a program, get each item.goal_num from props.program.programItems and add together
    const findTotalGoal = (programItemsArr) => {
        let totalCounter = 0
        programItemsArr.forEach(item => {
            totalCounter += item.goal_num
        })
        return totalCounter
    }

    // to get total currently purchased for a program, get each item.num_purchased from giverItems
    const findTotalPurchased = (programItemsArr) => {
        let totalCounter = 0
        programItemsArr.forEach(item => {
            let counter = 0
            item.giverItems.forEach(i => {
                counter += i.num_purchased
            })
            totalCounter += counter
        })
        return totalCounter
    }
    


    useEffect(() => {
        let goal = findTotalGoal(props.program.programItems)
        let purchased = findTotalPurchased(props.program.programItems)
        setTotalGoal(goal)
        setTotalPurchased(purchased)
        findTotalCurrentGiverPurch()
        setDataForChart([
            {
                "name": "Items Needed",
                "value": (goal - purchased)
            },
            {
                "name": "Items Donated to Date",
                "value": purchased
            }
        ])
    }, [props])



    return (
       
        <Grid item xs={12} sm={6}>
            {/* <Link className="program-mod-link" to={`/${props.program.id}`}> */}
            <Card className="program-mod-link" onClick={e => props.showDetailsPage(e, props.program, totalGoal, totalPurchased, totalCurrentGiverPurch) }>
                <CardContent align="center">
                    <h2>{props.program.name}</h2>
                    <p>{props.program.description}</p>
                    <h4>Progress to Goal</h4>
                    <ProgramDonut data={dataForChart} onHome={true} onDetails={false}/>
                    <p>Ends: <Moment fromNow>{props.program.endDate}</Moment> </p>
                </CardContent>
            </Card>
            {/* </Link> */}
       
        </Grid>
        
    )
}

export default ProgramModule