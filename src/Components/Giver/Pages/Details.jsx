import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import {PayPalButton} from 'react-paypal-button-v2'


import ProgramItem from '../ProgramItem'
import PurchaseConfirm from './PurchaseConfirm'


const Details = props => {
    
    let {id} = useParams()

    let [selectedProgram, setSelectedProgram] = useState(null)
    let [totalCost, setTotalCost] = useState(0)
    let [message, setMessage] = useState('')
    let [itemsInCart, setItemsInCart] = useState([])
    let [showCart, setShowCart] = useState(false)
    let [counts, setCounts] = useState({})
    let [purchaseConfirm, setPurchaseConfirm] = useState(false)
    let [loopCounter, setLoopCounter] = useState(0)
    let [orderId, setOrderId] = useState()
    let [itemsPurchased, setItemsPurchased] = useState([])

    //on load, grab id from params and set selected program state to the program that was clicked on
    useEffect(() => {
        setSelectedProgram(props.allPrograms.find(program => program.id == id))
    }, [props.allPrograms, id])

    //when selectedProgram changes (i.e. loads), create temporary object to keep track of item counts 
    const initCounts = () => {
        if(selectedProgram) {
            let temp = {}
            selectedProgram.programItems.forEach(item => {
                temp[item.id] = 0
            })
            setCounts(temp)
        }
    }
    
    useEffect(() => {
        initCounts()
    }, [selectedProgram])


    //total cost for "cart" and set the items in cart for purchasing
    const addToCart = (e) => {
        e.preventDefault()
        setMessage('')
        let total = 0
        selectedProgram.programItems.forEach(item => {
            total += (counts[item.id] * item.cost)
        })
        console.log('set total cost to:', total)
        if(total === 0) {
            setMessage('You have not added anything to your cart yet.')
        } else {
            setTotalCost(total.toFixed(2)) 
            let cart = selectedProgram.programItems.filter(item => counts[item.id] > 0)  
            setItemsInCart(cart)
            console.log('CART ITEMS:', itemsInCart )
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
            console.log('DATA SENT 🌈🌈🌈', JSON.stringify(item))
            //fetch to giveritems post route
            fetch(`${process.env.REACT_APP_SERVER_URL}/items/giver`, {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json'
                    // 'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json()
                .then(result => {
                    // console.log('🌈🌈🌈DATA RETURNED 🌈🌈🌈', result)
                    setLoopCounter(loopCounter += 1)
                    console.log('LOOP COUNTER 🥁',loopCounter)
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

        
    
    if(!selectedProgram) {
        return <div>Loading...</div>
    }

    if(purchaseConfirm) {
        console.log('ITEMS PURCHASED', itemsPurchased)
        return <PurchaseConfirm selectedProgram={selectedProgram} totalCost={totalCost} orderId={orderId} itemsPurchased={itemsPurchased}/>
    }

    let itemsList = selectedProgram.programItems.map((item, i) => {

        return <ProgramItem key={i} cartShowing={showCart} item={item} counts={counts} setCounts={setCounts} userId={props.user.id} />
            
    })

    if(showCart) {

        return (
           
           <Container>
                    <h1>{selectedProgram.name}</h1>
                    <h3>Your Cart</h3>
                    {totalCost > 0 ? <p>Total Cost: ${totalCost} </p> : <p>You have no items in your cart yet</p>}    
                    <form>
                        {itemsList}
                        <Button variant="contained" onClick={e => updateCart(e)}>Update My Cart</Button>
                        {message}
                        <PayPalButton
                            amount={totalCost}
                            onSuccess={(details) => {
                                console.log(details)
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
                    </form>
            </Container>
    
            
        )

    }

    return (
        <Container>
            <h1>{selectedProgram.name}</h1>
            <form>
                <h3>Items Needed</h3>
                {itemsList}
                <Button variant="contained" onClick={e => addToCart(e)}>Add To My Cart</Button>
                {message}
            </form>
        </Container>

        
    )
}


export default Details