import React from 'react'
import Button from '@material-ui/core/Button'

const ConfirmCart = props => {
    let purchaseInfo
    if(props.toPurchase.length) {

        purchaseInfo = props.toPurchase.map(item => {
        return (
        <p>{item.num_purchased} {item.name}: ${item.dollars_spent}</p>
        )
    })
    }

    return (
        <div>Are you sure you want to purchase for ${props.totalCost}?
        {purchaseInfo ? purchaseInfo : 'loading'}
            {/* <Button onClick={e => {props.handleSubmit}}>Yes</Button> */}
            {/* Button on click uses passed down function from details to handle submit which takes purchased state created when ready to total and creates data to post to backend */}
        </div>
    )
}

export default ConfirmCart