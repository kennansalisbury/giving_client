import React, {useState} from 'react'
import {Link, Redirect, useParams} from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Logo from "../../static/img/logo_black.png"

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      }
    },
  }));


const Login = props => {
    
    let {id} = useParams()

    const classes = useStyles();


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
    
    return (
        <Grid 
        className="login-background"
        container 
        direction ="column"
        justify = "center"
        alignItems = "center"
        spacing = {4}
      >
            <div className="login-cards"><img height="auto" width="250px" src={Logo} alt="logo"/></div>
            <Grid item xs={9} sm={6}>
                <Card className="login-cards">
                    <CardContent align="center" >
                        <h5>Login</h5>
                        <form className={classes.root} onSubmit={handleSubmit}>
                            <FormControl>
                                {/* <TextField required  label="Email"  size="small" value={id ? "motherteresa@gmail.com" : '' } onChange={e => setEmail(e.currentTarget.value)}/>
                                <TextField required type="password" label="Password" size="small" value={id ? "password" : '' } onChange={e => setPassword(e.currentTarget.value)}/> */}
                                <TextField required  label="Email"  size="small" onChange={e => setEmail(e.currentTarget.value)}/>
                                <TextField required type="password" label="Password" size="small" onChange={e => setPassword(e.currentTarget.value)}/>
                                <Button type="submit" variant="contained" size="small">Submit</Button>
                            </FormControl>
                        </form>
                        <p>{message}</p>
                        <p>Don't have an account yet? </p>
                        <Link to="/signup">Sign up here</Link>
                    </CardContent>
                </Card>
            </Grid>
            <a style={{color:"gray", fontSize: "8px"}} href="https://unsplash.com/@davidvig?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from David Vig">Photo credit: David Vig on Unsplash</a>
        </Grid>
        
    )
}

export default Login