import React from 'react'
import {Redirect} from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

//component imports
import ProgramModule from '../../ProgramModule'

const Home = props => {

    // const showDetailsPage = (e, currentProgram, totalGoal, totalPurchased, totalCurrentGiverPurch) => {
    //     e.preventDefault()
    //     setCurrentProgram(currentProgram)
    //     setTotalPurchased(totalPurchased)
    //     setTotalGoal(totalGoal)
    //     setTotalCurrentGiverPurch(totalCurrentGiverPurch)

    //     props.setShowDetails(true)
    // }
    

    if(!props.user) {
        return <Redirect to="/login" />
    }

    let allPrograms = props.allPrograms.map((program) => {
        return <ProgramModule 
                    // key={i} 
                    key={program.id}
                    program={program}
                    giverItems={props.giverItems}   
                    // showDetailsPage={showDetailsPage}                        
                    user = {props.user}
                    updateUser = {props.updateUser}
                    />
    })
    
    return (
        <Container>
            <Grid 
                container 
                direction ="row"
                justify = "center"
                alignItems = "flex-start"
                spacing = {4}>
                    {allPrograms}
            </Grid>
        </Container>
    )
}

export default Home