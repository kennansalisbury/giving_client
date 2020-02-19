import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const PurchaseConfirm = props => {
    console.log('SELECTED PROGRAM', props.selectedProgram)
    console.log('TOTAL COST', props.totalCost)

    if(!props.itemsPurchased || !props.selectedProgram || !props.totalCost || !props.orderId){
        return <p>Loading...</p>
    }
        

    if(props.itemsPurchased) {
        let orderItems = props.itemsPurchased.map(item => {
            return <p>{item.name}: {item.num_purchased} for ${item.dollars_spent.toFixed(2)}</p>
        })
    
        return (
            <div>
            <h1>Thank you for your donation</h1>
            <h2>to {props.selectedProgram.name}</h2>
            <h3>Order #: {props.orderId}</h3>
            <h3>Items in order:</h3>
            {orderItems}
            <h4>Total: {props.totalCost}</h4>
            <Link to="/"><Button>Return Home</Button></Link>
        </div>
    )
    }
}

export default PurchaseConfirm