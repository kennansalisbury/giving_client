import React, {useState} from 'react'

//form components
import ProgramForm from '../ProgramForm'
import ItemForm from '../ItemForm'

const CreateProgram = props => {
    //create state variables for toggling the forms
    
    let form = 'test form'
    //if toggle variable is false
        //form = ProgramForm component, pass down toggle variable
    
    //else if toggle variable true
        //form = ItemForm component, pass down setshowcreatepage variable

    return (
        <div>
            {form}
        </div>
    )
}

export default CreateProgram