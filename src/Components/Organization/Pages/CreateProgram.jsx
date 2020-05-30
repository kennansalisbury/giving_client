import React, {useState} from 'react'

//form components
import ProgramForm from '../ProgramForm'
import ItemForm from '../ItemForm'

const CreateProgram = props => {
    //create state variables for toggling the forms
    const [showItemForm, setShowItemForm] = useState(false)
    
    let form
    //if showItemForm variable is false
    if(!showItemForm) {
        //form = ProgramForm component, pass down toggle variable
        form = <ProgramForm setShowItemForm={setShowItemForm} />
    }
    //else if toggle variable true
    else {
        //form = ItemForm component, pass down setshowcreatepage variable
        form = <ItemForm setShowCreatePage={props.setShowCreatePage} />
    }
    


    return (
        <div>
            {form}
        </div>
    )
}

export default CreateProgram