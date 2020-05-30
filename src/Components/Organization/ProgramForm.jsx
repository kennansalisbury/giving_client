import React, {useState} from 'react'

//material ui imports
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {makeStyles} from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'

const ProgramForm = props => {
    //create form state variables
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [programItems, setProgramItems] = useState([])

    const classes = useStyles()

    //handle submit function
    const handleSubmit = (e) => {
        //fetch call to post program variables to database
        //set toggle variable(s) at CreateProgram to hide program form and show program item form
        console.log('submit form')
    }
       
    
    return (
        <form className={classes.root} onSubmit={handleSubmit}>
        <FormGroup> 
            <TextField required label="name" onChange={e => setName(e.currentTarget.value)}/>      
            <TextField label="description" onChange={e => setDescription(e.currentTarget.value)}/>
            <TextField 
                type="date"
                label="start"
                defaultValue={startDate}
                onChange={e => setStartDate(e.currentTarget.value)}
                InputLabelProps={{shrink: true}}
            />
            <TextField 
                type="date"
                label="end"
                defaultValue={endDate}
                onChange={e => setStartDate(e.currentTarget.value)}
                InputLabelProps={{shrink: true}}
            />
        </FormGroup>
        <p>Click below to create this program, and then add items on the next page.</p>
            <Button type="submit" variant="contained" size="medium">Create</Button>
        
    </form>
    )
}

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(3),
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: "95%",
        }
    }
  }));

export default ProgramForm