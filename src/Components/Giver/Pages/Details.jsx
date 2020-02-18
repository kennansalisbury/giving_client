import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Container} from 'reactstrap'

const Details = props => {
    let {id} = useParams()
    console.log(id)

    let [selectedProgram, setSelectedProgram] = useState(null)
    
    useEffect(() => {
        console.log('🚣‍♂️',props.allPrograms)
        setSelectedProgram(props.allPrograms.find(program => program.id == id))
    }, [])

    const handleSubmit = () => {
        //post to giveritems post route
    }
    
    if(selectedProgram) {
        let itemsList = selectedProgram.programItems.map((item, i) => {
            return (
            <div>
                <label>{item.name}</label>
            </div>
            )
        })
        return (
            <Container>
                <h1>{selectedProgram.name}</h1>
                <h3>Items Needed</h3>
                <form onSubmit={handleSubmit}>
                    {itemsList}
                </form>

            </Container>
            
        )
    }

    return (
        <div>Error</div>
    )
}

export default Details