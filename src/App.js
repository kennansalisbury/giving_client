import React, {useState, useEffect} from 'react'
import jwtDecode from 'jwt-decode'
import {BrowserRouter as Router} from 'react-router-dom'

import './App.css';

import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import GiverContent from './Components/Giver/GiverContent'
import Navbar from './Components/Navbar'



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
      <Router>
        <header>
          <Navbar user={user} updateUser={updateUser} />
        </header>
        <main>
          <GiverContent user={user} updateUser={updateUser}/>
        </main>
        {/* <footer>
          <Footer />
        </footer> */}
      </Router>
    )
  }

  return (
    <div className="App">
        <Login user={user} updateUser={updateUser} />
        <Signup user={user} updateUser={updateUser} />
    </div>
  );

}

export default App;
