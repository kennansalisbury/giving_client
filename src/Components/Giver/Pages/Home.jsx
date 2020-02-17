import React from 'react'
import Program from '../ProgramModule'

const Home = props => {

    let allPrograms = props.allPrograms.map((program, i) => {
        return <Program key={i} program={program} />
    })

    return (
        <div>
            HOME PAGE
            {allPrograms}
        </div>
    )
}

export default Home