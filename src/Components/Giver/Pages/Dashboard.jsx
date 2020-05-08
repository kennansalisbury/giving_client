import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import NumberFormat from 'react-number-format'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import IndividualItemBar from '../Charts/IndividualItemBar'

const Dashboard = props => {

    let [message, setMessage] = useState('')
    let [giverItems, setGiverItems] = useState([])
    // let [totalItems, setTotalItems] = useState(0)
    let [totalNumItemsPurchased, setTotalNumItemsPurchased] = useState(0)
    let [totalDollarsSpent, setTotalDollarsSpent] = useState(0)
    // let [programs, setPrograms] = useState([])
    let [totalPrograms, setTotalPrograms] = useState(0)
    let [topItems, setTopItems] = useState([])
    let [hasActivity, setHasActivity] = useState(true)

    useEffect(() => {
       fetchAccountData()
    }, [])

    useEffect(() => {
        if(giverItems.length) {
            // setTotalItems(giverItems.length)
            let sortedItems = giverItems.sort((a, b) => {
                return b.num_purchased - a.num_purchased
            })
            setTopItems(sortedItems)
            let totalPurchased = giverItems.reduce((total, item) => total += item.num_purchased, 0)
            setTotalNumItemsPurchased(totalPurchased)
            let totalDollars = giverItems.reduce((total, item) => total += item.dollars_spent, 0)
            setTotalDollarsSpent(totalDollars)
            let programs = {}
            giverItems.forEach(item => {
                programs[item.program] = 1
            })
            // setPrograms(Object.keys(programs))
            setTotalPrograms(Object.keys(programs).length)
        }
        else {
            setHasActivity(false)
        }
    }, [giverItems])

    const fetchAccountData = () => {
        let token = localStorage.getItem('userToken')
        if(props.user) {
        
            fetch(`${process.env.REACT_APP_SERVER_URL}/account/${props.user.id}`)
            // ,
            //         {
            //             headers: {
            //                 'Authorization': `Bearer ${token}`
            //             }
            //         })
                    .then(response => {
                        response.json().then(results => {
                            if(response.ok) {
                                // console.log('🌈🌈results RECEIVED🌈🌈', results)
                                let data = results.map(item => {
                                        return ({
                                            name: item.programItem.name,
                                            program: item.programItem.program.name,
                                            num_purchased: item.num_purchased,
                                            dollars_spent: item.dollars_spent,
                                            goal_num: item.programItem.goal_num
                                        }) 
                                    })
                                setGiverItems(data)
                            } else {
                                setMessage(`${response.status} ${response.statusText}: ${results.message}`)
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
    
    if(hasActivity && (!totalPrograms || !giverItems)) {
        return <div>Loading...</div>
    }
    else {

        let topItemsList = ''
        if(topItems) {
            topItemsList = topItems.map((item, i) => {
                while(i < 4) {
                    return <p key={item.name}>{i + 1}. {item.name} : {item.num_purchased}</p>
                }  
            })
        }
        

        let chartData = [
            {
                name: 'Program', 
                num: totalPrograms,
                togoal: 0
            },
            {
                name: 'Items', 
                num: totalNumItemsPurchased,
                togoal: 0
            },
            {
                name: 'Dollars', 
                num: totalDollarsSpent,
                togoal: 0
            }
        ]

        return (
            <Container>
                {message}
                <h1>Hi, {props.user.firstname}</h1>
                <h3>{totalPrograms > 0 ? "Thanks for all you've contributed!" : "You haven't donated anything yet. Once you do, you can view the details of your donations and total impact here!"}</h3>
                <hr/>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    align="flex-start"
                >
                    <Grid item xs={12} sm={5}>
                        {/* <Card className="dashboard-card"> */}
                        <Card>
                            <CardContent>
                            <h5>Your Contributions:</h5>
                            <Grid 
                            container
                            direction="row"
                            justify="flex-start"
                            align="flex-start"
                        >
                            <Grid item xs={6} sm={6}>
                                <h5>{totalPrograms} programs</h5>
                                {/* <IndividualItemBar data={programData} dashboard={true}/> */}
                                <h5>{totalNumItemsPurchased} donations</h5>
                                {/* <IndividualItemBar data={totalItemsData} dashboard={true}/> */}
                                <h5><NumberFormat thousandSeparator={true} displayType={'text'} value={totalDollarsSpent} prefix={'$'}/> </h5>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <IndividualItemBar data={chartData} dashboard={true}/>
                            </Grid>
                        </Grid>
                            </CardContent>
                        </Card>
                    
                    
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={12} sm={6}>
                    <Card>
                            <CardContent>
                                <h5>Your Top Donated Items:</h5>
                                {topItemsList ? topItemsList : 'No items here yet'}
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>
                <Link to="/"><Button variant="contained">Back to Home</Button></Link>
            </Container>
        )
    }
}

export default Dashboard