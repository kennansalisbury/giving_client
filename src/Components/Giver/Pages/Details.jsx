import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import ProgramItem from '../ProgramItem'
import ConfirmCart from '../ConfirmCart'


const Details = props => {
    
    let {id} = useParams()
    console.log(id)
    let [selectedProgram, setSelectedProgram] = useState(null)
    let [readyToTotal, setReadyToTotal] = useState(false)
    let [totalCost, setTotalCost] = useState(0)
    let [message, setMessage] = useState('')
    let [toPurchase, setToPurchase] = useState([])


    useEffect(() => {
        console.log('🚣‍♂️',props.allPrograms,)
        setSelectedProgram(props.allPrograms.find(program => program.id == id))
    }, [])


    const handleFirstClick = (e) => {
        e.preventDefault()
        setReadyToTotal(true)        
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        //get current state
        
        
        //post to giveritems post route
    }

    const handleChange = () => {
        //set state
        
    }

    const getTotalCost = (totalItemCost) => {
        if(readyToTotal) {
            setTotalCost(totalCost += totalItemCost) 
            if(totalCost === 0) {
                setMessage('You have not added anything to your cart.')
                setReadyToTotal(false)
            }
        } 
    }
    
    const pushToPurchase = (obj) => {
        if(readyToTotal && obj.num_purchased != 0) {
            setToPurchase(toPurchase.push(obj))
            console.log('toPurchase =', toPurchase)
        }
    }

        if(totalCost > 0) {
            return <ConfirmCart totalCost={totalCost} toPurchase={toPurchase} />
        }
    
        if(selectedProgram) {

            let itemsList = selectedProgram.programItems.map((item, i) => {
                
                // return <p>{item.name}</p>
    
                return <ProgramItem item={item} getTotalCost={getTotalCost} readyToTotal={readyToTotal} userId={props.user.id} pushToPurchase={pushToPurchase} />
                    
            })

        return (
            <Container>
                <h1>{selectedProgram.name}</h1>
                <form onSubmit={handleSubmit}>
                    <h3>Items Needed</h3>
                    {itemsList}
                    <Button variant="contained" onClick={e => {
                        handleFirstClick(e) 
                        }}>Total My Cart</Button>
                    {message}
                </form>


            </Container>
            
        )
    }

    return (
        <div>Loading...</div>
    )
}

export default Details