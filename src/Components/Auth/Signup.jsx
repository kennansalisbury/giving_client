import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {makeStyles} from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        }
    }
  }));


const Signup = props => {

    const classes = useStyles()

    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [profilePhoto, setProfilePhoto] = useState('')
    let [isDonor, setIsDonor] = useState('')
    let [organizationid, setOrganizationid] = useState(null)
    let [message, setMessage] = useState('')

    let [donorOrOrgSelected, setDonorOrOrgSelected] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        
        //set data to input data
        let data = {
            firstname,
            lastname,
            email,
            password,
            profilePhoto,
            isDonor,
            organizationid
        }

        //post to backend signup route
        fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
            method: 'Post',
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

    const handleRadioSelect = (e) => {
        setDonorOrOrgSelected(e.target.value)
        if(e.target.value === 'donor') {
            console.log('donor is true')
            setIsDonor(true)
        } else {
            console.log('donor is false')
            setIsDonor(false)
        }
    }

    let verifyOrg
    // let orgBeingVerified
    const verifyOrganization = (e) => {
        e.preventDefault()
        console.log(`STUB: You entered ${organizationid} for the organization id. Will verify that here.`)
        //fetch organization get route, compare to ids
        //if id exists for organization, they can continue filling out their form and submitting to sign up
        //if id does not exist for an organization, set error message 

    }


    if(donorOrOrgSelected === 'org') {
        verifyOrg = 
        <div>
            <label>Verify your organization id</label>
            <input type="text" onChange={e => setOrganizationid(e.currentTarget.value)}/>
            <button onClick={verifyOrganization}>Verify</button>
        </div>
    }

  

    return (
        <Grid item xs={12} s={6}>
            <Card>
                <CardContent>
                    <h5 align="center">Sign up</h5>
                    <p>{message}</p>
                    <form className={classes.root} onSubmit={handleSubmit}>
                        <FormGroup fullWidth>
                            {/* <FormLabel>first name</FormLabel> */}
                            <TextField fullWidth required label="firstname" onChange={e => setFirstname(e.currentTarget.value)}/>
                            {/* <FormLabel>last name</FormLabel> */}
                            <TextField fullWidth label="lastname" onChange={e => setLastname(e.currentTarget.value)}/>
                        {/* </FormGroup>
                        <FormGroup> */}
                            {/* <FormLabel>email</FormLabel> */}
                            <TextField required type="text" label="email" onChange={e => setEmail(e.currentTarget.value)}/>
                            {/* <FormLabel>password</FormLabel> */}
                            <TextField required type="text" label="password" onChange={e => setPassword(e.currentTarget.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Are you a potential giver, or are you with an organization?</FormLabel>
                                    <RadioGroup value={donorOrOrgSelected} onChange={handleRadioSelect}>
                                        <FormControlLabel value="donor" control={<Radio />} label="Giver"/>
                                        <FormControlLabel value="org" control={<Radio />} label="Organization"/>
                                        {verifyOrg}
                                    </RadioGroup>
                            </FormControl>
                        </FormGroup>
                            <Button type="submit" variant="contained" size="small">Sign up</Button>
                        
                    </form>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default Signup