import React, {useState, useEffect} from 'react'
import {Card, Col, CardText, CardBody, CardTitle, Button} from 'reactstrap'

const ProgramModule = props => {
    
    let [totalGoal, setTotalGoal] = useState('')
    let [totalPurchased, setTotalPurchased] = useState('')
   
    useEffect(() => {
        findTotalGoal()
        findTotalPurchased()
    }, [])
    
    // to get total goal, get each item.goal_num from props.program.programItems and add together
    const findTotalGoal = () => {
        let totalCounter = 0
        props.program.programItems.forEach(item => {
            totalCounter += item.goal_num
        })
        setTotalGoal(totalCounter)
    }

    // to get total currently purchased, get each item.num_purchased from giverItems
    const findTotalPurchased = () => {
        let totalCounter = 0
        props.program.programItems.forEach(item => {
            let counter = 0
            item.giverItems.forEach(i => {
                counter += i.num_purchased
            })
            totalCounter += counter
        })
        setTotalPurchased(totalCounter) 
    }

  

    return (
        <Col xs="12" sm="5">
            <Card>
                <CardBody>
                    <CardTitle tag="h1">{props.program.name}</CardTitle>
                    <CardText>{props.program.description}</CardText>
                    <CardText tag="h4">Ends: {props.program.endDate} </CardText>
                    <CardText>Goal: {totalGoal}</CardText>
                    <CardText>Total Items Purchased To Date: {totalPurchased}</CardText>
                </CardBody>
            </Card>
        </Col>
    )
}

export default ProgramModule