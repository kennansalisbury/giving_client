import React, {useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
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

    if (!allPrograms || !allPrograms.length) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {message}
            <Switch>
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

                {/* <Route path={"/:id"} 
                    render={() => 
                        <Details 
                            user={props.user} 
                            updateUser={props.updateUser} 
                            allPrograms={allPrograms}
                            giverItems={giverItems}
                        />
                    }
                /> */}

            </Switch>
            
        </div>
    )

}

export default GiverContent