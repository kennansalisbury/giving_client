import React, {useState} from 'react'

const Signup = props => {

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
        <div>
            <h1>Sign up</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <label>first name</label>
                <input type="text" name="firstname" onChange={e => setFirstname(e.currentTarget.value)}/>
                <label>last name</label>
                <input type="text" name="lastname" onChange={e => setLastname(e.currentTarget.value)}/>
                <label>email</label>
                <input type="text" name="email" onChange={e => setEmail(e.currentTarget.value)}/>
                <label>password</label>
                <input type="text" name="password" onChange={e => setPassword(e.currentTarget.value)}/>
                <p>are you a potential giver, or are you with an organization?</p>
                    <input type="radio" name="isDonor" value='donor' checked={donorOrOrgSelected === 'donor' } onChange={handleRadioSelect}/>
                    <label>Giver</label>
                    <input type="radio" name="isDonor" value='org' checked={donorOrOrgSelected === 'org'} onChange={handleRadioSelect}/>
                    <label>Organization Employee</label>
                    {verifyOrg}
                <button type="submit">Sign up</button>

            </form>
        </div>
    )
}

export default Signup