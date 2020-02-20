import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {Link} from 'react-router-dom'
import ProgramDonut from './ProgramDonut'
import Moment from 'react-moment'

const ProgramModule = props => {
    
    let [totalGoal, setTotalGoal] = useState('')
    let [totalPurchased, setTotalPurchased] = useState('')

    useEffect(() => {
        let goal = props.findTotalGoal(props.program.programItems)
        let purchased = props.findTotalPurchased(props.program.programItems)
        setTotalGoal(goal)
        setTotalPurchased(purchased)
    }, [props])
    
    return (
        <Grid item xs={12} sm={6}>
            <Link className="program-mod-link" to={`/${props.program.id}`}>
            <Card>
                <CardContent>
                    <h1>{props.program.name}</h1>
                    <p>{props.program.description}</p>
                    <p>Ends: <Moment fromNow>{props.program.endDate}</Moment> </p>
                    <h4>Progress to Goal</h4>
                    <ProgramDonut totalGoal={totalGoal} totalPurchased={totalPurchased}/>
                </CardContent>
            </Card>
            </Link>
        </Grid>
    )
}

export default ProgramModule