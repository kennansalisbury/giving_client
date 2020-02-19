import React, {useEffect} from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const ConfirmCart = props => {
    console.log('cart props to purchase:', props.toPurchase)
    // if(!props.toPurchase || !props.toPurchase.length) {
    //     return <div>Loading cart...</div>
    // }
    // let purchaseInfo
    // // const checkForPurchaseInfo = () => {
    //     if(props.toPurchase.length) {
    //         purchaseInfo = props.toPurchase.map(item => {
    //             return (
    //                 <p>{item.num_purchased} {item.name}: ${item.dollars_spent}</p>
    //             )
    //         })
    //     }
    // // }
    
    // useEffect(() => {
    //     console.log('toPurchase updated')
    //     checkForPurchaseInfo()
    //     console.log('checked for purchase info')
    // }, [props.toPurchase])
  


    return (
        <div>
           
            {props.totalCost > 0 ? <p>Total Cost: ${props.totalCost} </p> : <p>You have no items in your cart yet</p>}    
        
            {/* {purchaseInfo} */}
                {/* <Button onClick={e => {props.handleSubmit}}>Yes</Button> */}
                {/* Button on click uses passed down function from details to handle submit which takes purchased state created when ready to total and creates data to post to backend */}
        </div>
    )
}

export default ConfirmCart