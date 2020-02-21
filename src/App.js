import React, {useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import Grid from '@material-ui/core/Grid'

import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import GiverContent from './Components/Giver/GiverContent'




function App() {

  // Hooks 
  let [user, setUser] = useState(null)
  
  //Check for token on load
  useEffect(() => {
    decodeToken(null)
  }, [])

  //Decode token function
  const decodeToken = (existingToken) => {
    //token is either an existing token of current user, or need to grab from localstorage
    let token = existingToken || localStorage.getItem('userToken')
    let decoded
    
    //if a token exists, decode it 
    //then check if expired or invalid - if so, set user null
    //if both valid & not expired, set user to decoded token object
    if(token) {
      decoded = jwtDecode(token)
      if (!decoded || (Date.now() > decoded.exp * 1000 )) {
        setUser(null)
      } else {
        setUser(decoded)
      }
    //if token does not exist, set user to null
    } else {
        setUser(null)
    }
  }

  //Function to update the user state at the app level from other components when a user logs in, signs up or logs out
  const updateUser = (newToken) => {
    //if there is a new token, store it and decode it (which will set the user to this new info)
    if(newToken) {
      localStorage.setItem('userToken', newToken)
      decodeToken(newToken)
    } else {
      //if no token, user is null
      setUser(null)
    }
  }

  if(user) {
    return (
      <div>
        <Route exact path="/" 
            render={() => 
                <GiverContent 
                user={user} 
                updateUser={updateUser} 
              />
            }
        /> 
        <Route path={"/signup"} render={() => <Redirect to="/" /> }/>

      </div>
    )
  } else {
  return (
      <Grid 
        className="login-background"
        container 
        direction ="column"
        justify = "center"
        alignItems = "center"
        spacing = {4}
      >
        <h1 className="login-cards">The Giving Tree</h1>
        <Route exact path={"/"} render={() => <Login updateUser={updateUser}/>}/>
        <Route path={"/signup"} render={() => <Signup updateUser={updateUser} /> }/>
        <a style={{color:"gray", fontSize: "8px"}} href="https://unsplash.com/@davidvig?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from David Vig">Photo credit: David Vig on Unsplash</a>
      </Grid>
  )
}

}

export default App;
