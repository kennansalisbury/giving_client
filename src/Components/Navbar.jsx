import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import {
    Navbar as RSNavbar,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem
  } from 'reactstrap'

const Navbar = props => {
  
    let [profilePhoto, setProfilePhoto] = useState(<FontAwesomeIcon icon={faUserCircle}/>)

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('userToken')
        props.updateUser(null)
      }

    let homeIcon = <FontAwesomeIcon icon={faHome} color="black" />
    
    if(props.user.profilePhoto) {
        setProfilePhoto(<img className="profileIcon" src={props.user.profilePhoto} alt="profile-icon"/>)
    }

    let profileIcon = profilePhoto

    return (
        <div>
            <RSNavbar color="light" light expand="md">
                <NavbarBrand href="/">{homeIcon}</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem onClick={handleLogout}>
                        <NavLink href="#">Logout</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">{profileIcon}</NavLink>
                    </NavItem>
                </Nav>
            </RSNavbar>
        </div>
    )
}

export default Navbar