import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));


const Login = props => {
    
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
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardContent align="center">
                        <h5>Login</h5>
                        <form className={classes.root} onSubmit={handleSubmit}>
                            <FormControl>
                                <TextField required  label="Email"  size="small" onChange={e => setEmail(e.currentTarget.value)}/>
                                <TextField required  label="Password" size="small" onChange={e => setPassword(e.currentTarget.value)}/>
                                <Button type="submit" variant="contained" size="small">Submit</Button>
                            </FormControl>
                        </form>
                        <p>{message}</p>
                    </CardContent>
                </Card>
            </Grid>
    )
}

export default Login