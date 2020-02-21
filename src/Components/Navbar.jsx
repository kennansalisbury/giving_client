import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import{Divider, Drawer, AppBar, Grid, Toolbar, makeStyles, List, ListItem, ListItemText, IconButton, Menu, MenuItem} from '@material-ui/core'
import logoIcon from '../static/img/logo_black_icon.png'

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
      width: 200,
    }
}));

const Navbar = props => {
    let classes= useStyles()

    let [profilePhoto, setProfilePhoto] = useState(<FontAwesomeIcon icon={faUserCircle}/>)
    let [drawerState, setDrawerState] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const openMenu = Boolean(anchorEl)

    const toggleDrawer = (open) => event => {
        setDrawerState(open)
    }

    const handleLogout = (e) => {
        // e.preventDefault()
        localStorage.removeItem('userToken')
        props.updateUser(null)
        return <Redirect to="/" />
      }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
      }

    let homeIcon = <FontAwesomeIcon icon={faHome} color="black" />
    // let homeIcon = <img src={logoIcon} alt="logo-icon" height="30em"/>
    
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

                    <ListItem>
                    <Link className="link" to="/">
                        <ListItemText>Home</ListItemText>
                    </Link>
                    </ListItem>
                
                    <Divider/>
                    <ListItem>
                        <Link className="link" to="/account">
                        <ListItemText>Dashboard</ListItemText>
                        </Link>
                    </ListItem>
                </List>

            </div>
        )
    }

    return (
        <div>
            <AppBar position="static" color="transparent">
                
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="space-between">
                        <Grid item>
                            <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                {homeIcon}
                            </IconButton> 
                            <Drawer open={drawerState} onClose={toggleDrawer(false)}>
                                    {sideList()}
                            </Drawer>
                            
                        </Grid>
                        <Grid item>
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
                                open={openMenu}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
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