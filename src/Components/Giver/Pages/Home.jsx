import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import ProgramModule from '../ProgramModule'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Details from './Details'

const Home = props => {
    let [totalGoal, setTotalGoal] = useState(0)
    let [totalPurchased, setTotalPurchased] = useState(0)
    let [totalCurrentGiverPurch, setTotalCurrentGiverPurch] = useState(0)
    let [currentProgram, setCurrentProgram] = useState({})

    const showDetailsPage = (e, currentProgram, totalGoal, totalPurchased, totalCurrentGiverPurch) => {
        e.preventDefault()
        setCurrentProgram(currentProgram)
        setTotalPurchased(totalPurchased)
        setTotalGoal(totalGoal)
        setTotalCurrentGiverPurch(totalCurrentGiverPurch)

        props.setShowDetails(true)
    }


    if(!props.user) {
        return <Redirect to="/login" />
    }

    if(props.showDetails) {
        return(
            <Details 
                user={props.user} 
                updateUser={props.updateUser} 
                program={currentProgram}
                totalPurchased={totalPurchased}
                totalGoal={totalGoal}
                totalCurrentGiverPurch = {totalCurrentGiverPurch}
                setShowDetails = {props.setShowDetails}
            />
        )
    }
   
    // let allPrograms = props.allPrograms.map((program, i) => {
    let allPrograms = props.allPrograms.map((program) => {
        return <ProgramModule 
                    // key={i} 
                    key={program.id}
                    program={program}
                    giverItems={props.giverItems}   
                    showDetailsPage={showDetailsPage}                        
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