import React from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const PurchaseConfirm = props => {

    if(!props.itemsPurchased || !props.program || !props.totalCost || !props.orderId){
        return <p>Loading...</p>
    }

    if(props.itemsPurchased) {
        let orderItems = props.itemsPurchased.map(item => {
            return <p>{item.name}: {item.num_purchased} for ${item.dollars_spent.toFixed(2)}</p>
        })
    
        return (
            <div>
            <h1>Thank you for your donation</h1>
            <h2>to {props.program.name}</h2>
            <h3>Order #: {props.orderId}</h3>
            <h3>Items in order:</h3>
            {orderItems}
            <h4>Total: {props.totalCost}</h4>
            <Button onClick={e => props.setShowDetails(false)}>Return Home</Button>
        </div>
    )
    }
}

export default PurchaseConfirm