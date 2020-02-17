import React, {useState, useEffect} from 'react'
import {Route} from 'react-router-dom'
import Home from './Pages/Home'

const GiverContent = props => {
    
    let [allPrograms, setAllPrograms] = useState([])
    let [giverItems, setGiverItems] = useState([])
    let [message, setMessage] = useState([])

    //fetch data, and set state
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/programs/${props.user.id}`)
        .then(response => {response.json()
            .then(data => {
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

    //on load, call fetch data function
    useEffect(() => {
        fetchData()
    }, [])

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
                    />
                }
            />
        </div>
    )

}

export default GiverContent