import React, {useState} from 'react'

const Login = props => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            email,
            password
        }

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
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    return (
        <div>
           <form onSubmit={handleSubmit}>
            <input type="text" name="email" onChange={e => setEmail(e.currentTarget.value)}/>
            <input type="text" name="password" onChange={e => setPassword(e.currentTarget.value)}/>
            <button type="submit">Submit</button>
           </form>
        </div>
    )
}

export default Login