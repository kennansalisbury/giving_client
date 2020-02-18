import React from 'react'
import Program from '../ProgramModule'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

const Home = props => {
    console.log(props.allPrograms)

    let allPrograms = props.allPrograms.map((program, i) => {
        return <Program 
                    key={i} 
                    program={program}                         
                    findTotalGoal = {props.findTotalGoal}
                    findTotalPurchased = {props.findTotalPurchased}/>
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