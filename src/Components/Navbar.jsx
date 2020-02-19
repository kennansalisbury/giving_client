import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import{Button, Drawer, AppBar, Toolbar, makeStyles, List, ListItem, ListItemText, IconButton, Menu, MenuItem} from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
}));

const Navbar = props => {
    let classes= useStyles()
  
    let [profilePhoto, setProfilePhoto] = useState(<FontAwesomeIcon icon={faUserCircle}/>)
    let [drawerState, setDrawerState] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const toggleDrawer = (open) => event => {
        setDrawerState(open)
    }

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('userToken')
        props.updateUser(null)
      }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
      }

    let homeIcon = <FontAwesomeIcon icon={faHome} color="black" />
    
    if(props.user.profilePhoto) {
        setProfilePhoto(<img className="profileIcon" src={props.user.profilePhoto} alt="profile-icon"/>)
    }


    let profileIcon = profilePhoto

    let sideList = () => {
        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
            >
                <List>
                    <Link to="/">
                        <ListItem>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Link>
                    
                    <ListItem>
                        <ListItemText>Account</ListItemText>
                    </ListItem>
                </List>

            </div>
        )
    }

    return (
        <div>
            <AppBar position="static" color="transparent">
                
                <Toolbar>
                    <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        {homeIcon}
                        <Drawer open={drawerState} onClose={toggleDrawer(false)}>
                            {sideList()}
                        </Drawer>
                    </IconButton> 
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            {profileIcon}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Account</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>

            </AppBar>


            {/* <RSNavbar color="light" light expand="md">
                <NavbarBrand href="/">{homeIcon}</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem onClick={handleLogout}>
                        <NavLink href="#">Logout</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">{profileIcon}</NavLink>
                    </NavItem>
                </Nav>
            </RSNavbar> */}

        </div>
    )
}

export default Navbar