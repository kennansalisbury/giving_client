import React, {useState} from 'react'
import {Route} from 'react-router-dom'
import Home from './Pages/Home'

const GiverContent = props => {

    return (
        <div>
           <Route exact path="/" render={() => <Home user={props.user} updateUser={props.updateUser}/>}/>
        </div>
    )

}

export default GiverContent