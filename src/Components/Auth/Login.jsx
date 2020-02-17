import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

const Login = props => {

    //set hooks for login form
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [message, setMessage] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        //data to post to login
        let data = {
            email,
            password
        }

        //fetch to post login and return token
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            response.json()
            .then(result => {
                console.log('Response', response, 'Result', result)
                //if response.ok = true, updateUser(result.token)
                if(response.ok) {
                    props.updateUser(result.token)
                } else {
                    //else show the error in a message on the page
                    setMessage(`${response.status} ${response.statusText}: ${result.message}`)
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    //if there is a user, redirect to home
    if(props.user) {
        // return <Redirect to="/Home"/>
        return (
            <h1>User logged in: {props.user.firstname} {props.user.lastname}, {props.user.email}</h1>
        )
    }
    
    return (
        <div>
           <form onSubmit={handleSubmit}>
            <input type="text" name="email" onChange={e => setEmail(e.currentTarget.value)}/>
            <input type="text" name="password" onChange={e => setPassword(e.currentTarget.value)}/>
            <button type="submit">Submit</button>
           </form>
           <p>{message}</p>
        </div>
    )
}

export default Login