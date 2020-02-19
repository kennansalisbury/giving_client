import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import ProgramItem from '../ProgramItem'
import ConfirmCart from '../ConfirmCart'



const Details = props => {
    
    let {id} = useParams()

    let [selectedProgram, setSelectedProgram] = useState(null)
    let [totalCost, setTotalCost] = useState(0)
    let [message, setMessage] = useState('')
    let [itemsInCart, setItemsInCart] = useState([])
    let [showCart, setShowCart] = useState(false)

    let [counts, setCounts] = useState({})

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


    const addToCart = (e) => {
        e.preventDefault()
        let total = 0
        selectedProgram.programItems.forEach(item => {
            total += (counts[item.id] * item.cost)
        })
        console.log('set total cost to:', total)
        if(total === 0) {
            setMessage('You have not added anything to your cart yet.')
        } else {
            setTotalCost(total) 
            let cart = selectedProgram.programItems.filter(item => counts[item.id] > 0)  
            setItemsInCart(cart)
            console.log('CART ITEMS:', itemsInCart )
            setShowCart(true) 
        }
    }

    const updateCart = (e) => {
        e.preventDefault()
        setTotalCost(0)
        setItemsInCart([])
        setShowCart(false)
        initCounts()
    }

    console.log('itemsInCart =', itemsInCart)

    const handleSubmit = (e) => {
        e.preventDefault()
        //create array of data objects to post from itemsInCart and counts states
        let data = itemsInCart.map((item, i) => ({ 
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
                    console.log('🌈🌈🌈DATA RETURNED 🌈🌈🌈', result)
                })
            )
            .catch(err => {
                console.log(err)
            })
        })

        //fetch to giveritems post route
        // fetch(`${process.env.REACT_APP_SERVER_URL}/items/giver`, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json'
        //         // 'Authorization': `Bearer ${token}`
        //     }
        // })
        // .then(response => response.json()
        //     .then(result => {
        //         console.log('🌈🌈🌈DATA RETURNED 🌈🌈🌈', result)
        //     })
        // )
        // .catch(err => {
        //     console.log(err)
        // })
    }

    console.log('about to render selected program', selectedProgram)
    console.log('🌷🌷🌷🌷', counts)
    
    
    if(!selectedProgram) {
        return <div>Loading...</div>
    }

    let itemsList = selectedProgram.programItems.map((item, i) => {
        
        // return <p>{item.name}</p>

        return <ProgramItem key={i} cartShowing={showCart} item={item} counts={counts} setCounts={setCounts} userId={props.user.id} />
            
    })

    if(showCart) {
        return (
           
           <Container>
                    <h1>{selectedProgram.name}</h1>
                    <h3>Your Cart</h3>
                    <form onSubmit={handleSubmit}>
                        {itemsList}
                        <ConfirmCart totalCost={totalCost}/>
                        <Button variant="contained" onClick={e => updateCart(e)}>Update My Cart</Button>
                        <Button variant="contained" type="submit">Make Purchase</Button>
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