import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Pages/Home'
import Details from './Pages/Details'
import Navbar from '../Navbar'

const GiverContent = props => {



    let [allPrograms, setAllPrograms] = useState([])
    let [giverItems, setGiverItems] = useState([])
    let [message, setMessage] = useState([])
    let [showDetails, setShowDetails] = useState(false)
   
    console.log('show details', showDetails)

    useEffect(() => {
        fetchData()
    }, [showDetails])


    //fetch data, and set state
    const fetchData = () => {
       console.log(`Fetching data at ${process.env.REACT_APP_SERVER_URL}/programs/${props.user.id}`)
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

    if (!allPrograms || !allPrograms.length) {
        return <div>Loading...
                        {message}
        </div>
    }

    return (
        <div>
            <header>
                <Navbar user={props.user} updateUser={props.updateUser} setShowDetails={setShowDetails} />
            </header>
            <main>

                <Home 
                    user={props.user} 
                    updateUser={props.updateUser} 
                    allPrograms={allPrograms} 
                    giverItems={giverItems}
                    setShowDetails={setShowDetails}
                    showDetails={showDetails}
                />   
            </main>
            {/* <Home 
                user={props.user} 
                updateUser={props.updateUser} 
                allPrograms={allPrograms} 
                giverItems={giverItems}
            />     */}
        </div>
    )

}

export default GiverContent