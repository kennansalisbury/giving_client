import React, {useState, useEffect} from 'react'

//component imports
import Navbar from '../Navbar'
import Home from './Pages/Home'

const OrgContent = props => {

    let [allPrograms, setAllPrograms] = useState([])
    let [giverItems, setGiverItems] = useState([])
    let [message, setMessage] = useState('')
    let [showDetails, setShowDetails] = useState(false)

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

    return (

        <div>
            <Navbar user={props.user} updateUser={props.updateUser} setShowDetails={setShowDetails}/>
            <Home 
                user={props.user} 
                updateUser={props.updateUser} 
                allPrograms={allPrograms} 
                giverItems={giverItems}
                setShowDetails={setShowDetails}
                showDetails={showDetails}
            />
        </div>
    )
}

export default OrgContent