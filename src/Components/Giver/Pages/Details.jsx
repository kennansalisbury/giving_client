import React, {useState, useEffect} from 'react'
import {Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {PayPalButton} from 'react-paypal-button-v2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format'


import ProgramItem from '../ProgramItem'
import PurchaseConfirm from './PurchaseConfirm'
import ProgramDonut from '../../Charts/ProgramDonut'


const Details = props => {

    let [totalCost, setTotalCost] = useState(0)
    let [message, setMessage] = useState('')
    let [itemsInCart, setItemsInCart] = useState([])
    let [showCart, setShowCart] = useState(false)
    let [counts, setCounts] = useState({})
    let [purchaseConfirm, setPurchaseConfirm] = useState(false)
    let [loopCounter, setLoopCounter] = useState(0)
    let [orderId, setOrderId] = useState()
    let [itemsPurchased, setItemsPurchased] = useState([])
    let [totalGivers, setTotalGivers] = useState(0)
    let [giverCounts, setGiverCounts] = useState([])
 
    let [dataForChart, setDataForChart] = useState([{
        "name": "Items Needed",
        "value": (props.totalGoal - props.totalPurchased)
    },
    {
        "name": "Items Donated to Date",
        "value": props.totalPurchased
    }])



    //when program changes (i.e. loads), create temporary object to keep track of item counts 
    const initCounts = () => {
        if(props.program) {
            let temp = {}
            props.program.programItems.forEach(item => {
                temp[item.id] = 0
            })
            setCounts(temp)
        }
    }
    
    useEffect(() => {
        if(props.program) {
            initCounts()
            setTotalGivers(findTotalGivers())
        }
    }, [props.program])

  
    const formatDataForChart = (tempTotal) => {
        let data = [
            {
                "name": "Items Needed",
                "value": (props.totalGoal - (props.totalPurchased + tempTotal))
            },
            {
                "name": "Items Donated to Date",
                "value": props.totalPurchased + tempTotal
            }
        ]
        setDataForChart(data)
    }

    const tempTotalCounts = (counts) => {
        let total = 0
        props.program.programItems.forEach(item => {
            total += counts[item.id]
        }) 
        formatDataForChart(total)
    }

    //total cost for "cart" and set the items in cart for purchasing
    const addToCart = (e) => {
        e.preventDefault()
        setMessage('')

        let total = 0
        props.program.programItems.forEach(item => {
            total += (counts[item.id] * item.cost)
        })

        if(total === 0) {
            setMessage('You have not added anything to your cart yet.')
        } else {
            setTotalCost(total.toFixed(2)) 
            let cart = props.program.programItems.filter(item => counts[item.id] > 0)  
            setItemsInCart(cart)
            // console.log('CART ITEMS:', itemsInCart )
            setShowCart(true) 
        }
    }

    //go back to ability to update cart
    const updateCart = (e) => {
        e.preventDefault()
        setTotalCost(0)
        setItemsInCart([])
        setShowCart(false)
        initCounts()
        setDataForChart([{
            "name": "Items Needed",
            "value": (props.totalGoal - props.totalPurchased)
        },
        {
            "name": "Items Donated to Date",
            "value": props.totalPurchased
        }])
    }

    //once paypal payment complete, post to database and render confirmation page
    const handleSubmit = (details) => {
        //create state for passing to purchase confirm
        let purchasedItems = itemsInCart.map(item => ({
            name: item.name,
            num_purchased: counts[item.id],
            dollars_spent: counts[item.id] * item.cost
        }))
        
        setItemsPurchased(purchasedItems)
        
        //create array of data objects to post from itemsInCart and counts states
        let data = itemsInCart.map(item => ({ 
                num_purchased: counts[item.id],
                dollars_spent: counts[item.id] * item.cost,
                userId: props.user.id,
                programItemId: item.id
            })
        )

        data.forEach(item => {
            let token = localStorage.getItem('userToken')
            //fetch to giveritems post route
            fetch(`${process.env.REACT_APP_SERVER_URL}/items/giver`, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json()
                .then(result => {
                    
                    setLoopCounter(loopCounter += 1)
                
                    if(loopCounter === data.length) {
                        setPurchaseConfirm(true)
                    }
                })
            )
            .catch(err => {
                console.log(err)
            })
        })

    }

        
    
    if(!props.program) {
        return <div>Loading...</div>
    }

    if(purchaseConfirm) {
 
        return <PurchaseConfirm user={props.user} program={props.program} totalCost={totalCost} orderId={orderId} itemsPurchased={itemsPurchased} setShowDetails={props.setShowDetails}/>
    }

    let itemsList = props.program.programItems.map((item) => {

        return <ProgramItem key={item.id} tempTotalCounts={tempTotalCounts} cartShowing={showCart} item={item} counts={counts} setCounts={setCounts} userId={props.user.id} />
            
    })


    if(showCart) {

        return (
           
           <Container>
                <br/>
                <FontAwesomeIcon icon={faAngleLeft} color="black" size="lg" onClick={e => updateCart(e)} className="program-mod-link"/>
                <br/><br/>
                <h1>{props.program.name}</h1>
                <hr/>
                <h3>Your Cart</h3>
                {totalCost > 0 ? <p>Total Cost: <NumberFormat thousandSeparator={true} displayType={'text'} value={totalCost} prefix={'$'}/> </p> : <p>You have no items in your cart yet</p>}    
                <Grid container
                    direction="row"
                    justify-content="flex-start"
                    align-items="center"
                >
                    <Grid item xs={12} sm={6}>                
                        <form>
                            <Card variant="outlined">
                                <CardContent>{itemsList}</CardContent>
                            </Card>
                            <Button variant="contained" onClick={e => updateCart(e)}>Update My Cart</Button>
                            <br/>
                            {message}
                            <br/>
                            <div xs={12} sm={6}>

                            <PayPalButton
                                amount={totalCost}
                                onSuccess={(details) => {
                                    // console.log(details)
                                    setOrderId(details.id)
                                    handleSubmit()
                                }}
                                catchError={err => {
                                    console.log(err)
                                    setMessage(`Payment declined, or there was an error with your transaction method. Try again.`)
                                }}
                                onError={err => {
                                    setMessage(`Transaction Error. Try again.`)
                                }}
                                style={{layout: "vertical", tagline: false}}
                            />
                            </div>
                        </form>
                        </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                </Grid>
            </Container>
    
            
        )

    }

    if(!props.user) {
        return <Redirect to="/login"/>
    }

    const findTotalGivers = () => {
        if(props.program) {
            let temp = {}
            props.program.programItems.forEach(item => {
                item.giverItems.forEach(gi => {
                
                    if(!temp[gi.usd]) {
                        temp[gi.usd] = 1
                    // } else {
                    //     temp[gi.usd] = temp[gi.usd] += 1
                    }
                    
                }) 
            })
           setGiverCounts(Object.keys(temp))
           return Object.keys(temp).length
        }
    }

    let giverIcons = giverCounts.map((giver, i) => {
        return <FontAwesomeIcon key={i} icon={faUser} />
    })


    return (
        <Container>
            <br/>
            <FontAwesomeIcon icon={faAngleLeft} color="black" size="lg" onClick={e => props.setShowDetails(false)} className="program-mod-link"/>
            <br/>
            <br/>
            <h1>{props.program.name}</h1>
            <hr/>
            <h3>Items Needed</h3>
            <h6>Start adding items to your list to see how you can help us reach our goals!</h6>
            <Grid container
                direction="row"
                justify-content="flex-start"
                align-items="center"
            >
                <Grid item xs={12} sm={6}>
                    <form>
                        <Card variant="outlined">
                            <CardContent>{itemsList}</CardContent>
                        </Card>
                        <br/>
                        <Button variant="contained" onClick={e => addToCart(e)}>Add To My Cart</Button>
                        <br/>
                        {message}
                    </form>
                    <br/>
                </Grid>
    
                <Grid align="center" item xs={12} sm={5}>
                    <h4>Progress to Total Program Goal</h4>
                    <h6>{totalGivers === 1 ? '1 Giver has donated so far' : totalGivers + ' Givers have donated so far'}</h6>
                    {giverIcons}
                    <ProgramDonut data={dataForChart} onDetails={true}/>
                </Grid>
            </Grid>

        </Container>
    )
}


export default Details
  