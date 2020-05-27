import React, {useState} from 'react'

const ProgramForm = props => {
    //create form state variables
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [programItems, setProgramItems] = useState([])

    //handle submit
        //fetch call to post program variables to database
        //set toggle variable(s) at CreateProgram to hide program form and show program item form
    
    return (
        <div>Program Form Stub</div>
    )
}

export default ProgramForm