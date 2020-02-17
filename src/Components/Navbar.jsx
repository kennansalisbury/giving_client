import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = props => {

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('userToken')
        props.updateUser(null)
      }

    return (
        <div>
            <p>Hi {props.user.firstname}</p>
            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar