import React, {useState, useEffect} from 'react'

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
        <div>
            <h1>{props.program.name}</h1>
            <p>{props.program.description}</p>
            <p>Ends: {props.program.endDate} </p>
            <p>Goal: {totalGoal}</p>
            <p>Total Items Purchased To Date: {totalPurchased}</p>
            {/* show total current number of items purchased and total goal */}
        </div>
    )
}

export default ProgramModule