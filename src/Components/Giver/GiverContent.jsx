import React, {useState, useEffect} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Home from './Pages/Home'
import Details from './Pages/Details'
import Navbar from '../Navbar'
import Dashboard from './Pages/Dashboard'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'

const GiverContent = props => {

    let [allPrograms, setAllPrograms] = useState([])
    let [giverItems, setGiverItems] = useState([])
    let [message, setMessage] = useState([])
    let [showDetails, setShowDetails] = useState(false)
   
    console.log('show details', showDetails)
  
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


        if(props.user) {

        if ((!allPrograms || !allPrograms.length)) {
            return ( <div>Loading...</div>)
        }

        return (
            <div>
                <header>
                    <Navbar user={props.user} updateUser={props.updateUser} setShowDetails={setShowDetails} />
                </header>
                <main>
                <Switch>
   
                    <Route exact path="/" render={() => 
                        <Home 
                            user={props.user} 
                            updateUser={props.updateUser} 
                            allPrograms={allPrograms} 
                            giverItems={giverItems}
                            setShowDetails={setShowDetails}
                            showDetails={showDetails}
                        />  
                        }
                    /> 

                    <Route path="/account" 
                            render={() => 
                                <Dashboard 
                                    user={props.user} 
                                    updateUser={props.updateUser} 
                                    allPrograms={allPrograms} 
                                    giverItems={giverItems}
                            />
                            }
                    /> 

                    
                    {/* <Route render={() => <Redirect to="/"/>}/> */}
                </Switch>
                </main>
            </div>
        )

    }
   
    return (
        <Switch>
            <Route exact path={"/"} render={() => <Login updateUser={props.updateUser}/>}/>
            <Route path={"/login/:id"} render={() => <Login updateUser={props.updateUser}/>}/>
            <Route path={"/signup"} render={() => <Signup updateUser={props.updateUser} /> }/>
            {/* <Route render={() => <Redirect to="/"/>}/> */}
        </Switch>
    )


}

export default GiverContent