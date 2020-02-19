import React, {useState, useEffect} from 'react'
// import {Card, Col, CardText, CardBody, CardTitle, Button} from 'reactstrap'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {Link} from 'react-router-dom'

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
                    <p>Ends: {props.program.endDate} </p>
                    <p>Goal: {totalGoal}</p>
                    <p>Total Items Purchased To Date: {totalPurchased}</p>
                </CardContent>
            </Card>
            </Link>
        </Grid>
    )
}

export default ProgramModule