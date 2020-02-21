import React, {useState, useEffect} from 'react'
import NumberFormat from 'react-number-format'

const Dashboard = props => {

    let [message, setMessage] = useState('')
    let [giverItems, setGiverItems] = useState([])
    let [totalItems, setTotalItems] = useState(0)
    let [totalNumItemsPurchased, setTotalNumItemsPurchased] = useState(0)
    let [totalDollarsSpent, setTotalDollarsSpent] = useState(0)
    let [programs, setPrograms] = useState([])
    let [totalPrograms, setTotalPrograms] = useState(0)
    let [topItems, setTopItems] = useState([])

    useEffect(() => {
       fetchAccountData()
    }, [])

    useEffect(() => {
        if(giverItems.length) {
            setTotalItems(giverItems.length)
            let sortedItems = giverItems.sort((a, b) => {
                return b.num_purchased - a.num_purchased
            })
            setTopItems(sortedItems)
            let totalPurchased = giverItems.reduce((total, item) => total += item.num_purchased, 0)
            setTotalNumItemsPurchased(totalPurchased)
            let totalDollars = giverItems.reduce((total, item) => total += item.dollars_spent, 0)
            setTotalDollarsSpent(totalDollars)
            console.log('TOTAL DOLLARS', totalDollars)
            let programs = {}
            giverItems.forEach(item => {
                programs[item.program] = 1
            })
            setPrograms(Object.keys(programs))
            setTotalPrograms(Object.keys(programs).length)
            console.log(Object.keys(programs).length)
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
                                console.log('🌈🌈results RECEIVED🌈🌈', results)
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

    console.log(giverItems)
    
    if(!giverItems || !totalPrograms) {
        return (<div>Loading...</div>)
    }
    else {

  

    let topItemsList = topItems.map((item, i) => {
        while(i < 4) {
            return <p key={i}>{item.name} : {item.num_purchased}</p>
        }  
    })

    return (
        <div>
            {message}
            <h1>Hi, {props.user.firstname}</h1>
            <h3>Thanks for all you've contributed.</h3>
            <p>You've helped us reach our goals on {totalPrograms} programs</p>
            <p>You have donated {totalNumItemsPurchased} items to people in need.</p>
            <p>That's <NumberFormat thousandSeparator={true} displayType={'text'} value={totalDollarsSpent} prefix={'$'}/> of your dollars that have gone to causes you care about.</p>
            
            <h5>Your Top Donated Items:</h5>
            {topItemsList}

        </div>
    )
    }
}

export default Dashboard