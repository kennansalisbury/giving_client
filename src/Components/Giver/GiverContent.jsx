import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from '../Navbar'
import Dashboard from './Pages/Dashboard'

const GiverContent = props => {

    let [allPrograms, setAllPrograms] = useState([])
    let [giverItems, setGiverItems] = useState([])
    let [message, setMessage] = useState('')
    let [showDetails, setShowDetails] = useState(false)
   
    // console.log('user', props.user)
  
    useEffect(() => {
        fetchData()
    }, [props.user])

        //fetch data, and set state
        const fetchData = () => {
            if(props.user) {
            let token = localStorage.getItem('userToken')
                fetch(`${process.env.REACT_APP_SERVER_URL}/programs/${props.user.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
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
        }

        if(!props.user) {
            // console.log(!props.user, 'no user', props.user)
            return <Redirect to="/login" />
        }

        if ((!allPrograms || !allPrograms.length)) {
            return ( <div>Loading...</div>)
        }

        return (
            <div>
                <header>
                    <Navbar user={props.user} updateUser={props.updateUser} setShowDetails={setShowDetails} />
                </header>
                <main>
                    {message}
                    {props.display === 'home' ? (
                        <Home 
                            user={props.user} 
                            updateUser={props.updateUser} 
                            allPrograms={allPrograms} 
                            giverItems={giverItems}
                            setShowDetails={setShowDetails}
                            showDetails={showDetails}
                        />)
                        :  
                        (<Dashboard 
                            user={props.user} 
                            updateUser={props.updateUser} 
                            allPrograms={allPrograms} 
                            giverItems={giverItems}
                        />)
                    }
                       
                </main>
            </div>
        )


}

export default GiverContent