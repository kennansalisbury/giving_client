import React from 'react'
import {Redirect} from 'react-router-dom'

//material ui elements
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

//icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPlus } from '@fortawesome/free-solid-svg-icons'

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
                    <Grid item xs={12} sm={6}>
                        <Card className="program-mod-link program-mod-card" onClick={e => console.log('Create new program') }>
                            <CardContent align="center">
                                <h2>Create New Program</h2>
                                <FontAwesomeIcon 
                                    icon={faPlusCircle} 
                                    color="black" 
                                    size="lg" 
                                    className="program-mod-link"/>
                            </CardContent>
                        </Card>
                    </Grid>
                    {allPrograms}
            </Grid>
        </Container>
    )
}

export default Home