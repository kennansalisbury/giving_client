import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Container from '@material-ui/core/Container'
import NumberFormat from 'react-number-format'

const PurchaseConfirm = props => {

    if(!props.itemsPurchased || !props.program || !props.totalCost || !props.orderId){
        return <p>Loading...</p>
    }

    if(props.itemsPurchased) {
        let orderItems = props.itemsPurchased.map(item => {
            return <p key={item.name}>{item.name}: {item.num_purchased} for ${item.dollars_spent.toFixed(2)}</p>
        })
    
        return (
             <Container>
                <br/><br/>
                <h2>Thank you for your donation, {props.user.firstname}!</h2>
                <hr/>
                <p>Order #: {props.orderId}</p>
                <h3>Items in order:</h3>
                <Grid container
                    direction="row"
                    justify-content="flex-start"
                    align-items="center"
                >
                    <Grid item xs={12} sm={6}>      
                        <Card variant="outlined">
                            <CardContent>{orderItems}</CardContent>
                        </Card>
                        <br/>
                        <h5>Total: <NumberFormat thousandSeparator={true} displayType={'text'} value={props.totalCost} prefix={'$'}/></h5>
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <br/>
                    <Button variant="contained" onClick={(e => props.setShowDetails(false))}>Return Home</Button>
                </Grid>
            </Container>
    )
    }
}

export default PurchaseConfirm