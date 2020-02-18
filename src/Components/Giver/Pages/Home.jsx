import React from 'react'
import Program from '../ProgramModule'
import {Container, Row} from 'reactstrap'

const Home = props => {

    let allPrograms = props.allPrograms.map((program, i) => {
        return <Program key={i} program={program} />
    })

    return (
        <Container>
            <Row>
                {allPrograms}
            </Row>
        </Container>

    )
}

export default Home