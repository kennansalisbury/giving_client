import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import Home from './Pages/Home'
import Details from './Pages/Details'

const GiverContent = props => {

    let [allPrograms, setAllPrograms] = useState([])
    let [giverItems, setGiverItems] = useState([])
    let [message, setMessage] = useState([])
  
    useEffect(() => {
        fetchData()
    }, [])


    //fetch data, and set state
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/programs/${props.user.id}`)
        .then(response => {
            response.json().then(data => {
                if(response.ok) {
                    setAllPrograms(data[0].programs)
                    setGiverItems(data[1].giverItems)
                } else {
                    setMessage(`${response.status} ${response.statusText}: ${data.message}`)
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
  }

    // to get total goal for a program, get each item.goal_num from props.program.programItems and add together
    const findTotalGoal = (programItemsArr) => {
        let totalCounter = 0
        programItemsArr.forEach(item => {
            totalCounter += item.goal_num
        })
        return totalCounter
    }

    // to get total currently purchased for a program, get each item.num_purchased from giverItems
    const findTotalPurchased = (programItemsArr) => {
        let totalCounter = 0
        programItemsArr.forEach(item => {
            let counter = 0
            item.giverItems.forEach(i => {
                counter += i.num_purchased
            })
            totalCounter += counter
        })
        return totalCounter
    }

    console.log('About to render', allPrograms)
    if (!allPrograms || !allPrograms.length) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {message}
           <Route exact path="/" 
                render={() => 
                    <Home 
                        user={props.user} 
                        updateUser={props.updateUser} 
                        allPrograms={allPrograms} 
                        giverItems={giverItems}
                        findTotalGoal = {findTotalGoal}
                        findTotalPurchased = {findTotalPurchased}
                    />
                }
            />
            <Route path="/:id" 
                render={() => 
                    <Details 
                        user={props.user} 
                        updateUser={props.updateUser} 
                        allPrograms={allPrograms} 
                        giverItems={giverItems}
                        findTotalGoal = {findTotalGoal}
                        findTotalPurchased = {findTotalPurchased}
                    />
                }
            />
        </div>
    )

}

export default GiverContent