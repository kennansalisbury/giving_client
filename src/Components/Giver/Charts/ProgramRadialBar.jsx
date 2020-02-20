import React from 'react'
import {RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts'

const ProgramRadialBar = props => {
    //set data to be left to goal, days left, and donors to date
    //make percentages and sort from highest to lowest percentage
    
    const data = [
        
          {
            "name": "Days Left",
            "uv": 25,
            "fill": "#83a6ed"
          },
          {
            "name": "Donors to Date",
            "uv": 50,
            "fill": "#8dd1e1"
          },
          {
            "name": "Left To Goal",
            "num": 75,
            "fill": "#8884d8"
          }

    ]
    
    const renderTooltip = (entry) => {
        
        console.log(entry)


        if(entry.payload.length) {
                return(
                    <div>
                        {entry.payload[0].payload.name}{entry.payload[0].payload.num}
                    </div>
                )
            }

    
            return(
                <div>TEST</div>
            )
        
    }
    
    return (
        <div>
            <RadialBarChart 
                width={730} 
                height={250} 
                innerRadius="20%" 
                outerRadius="80%" 
                data={data} 
                startAngle={180} 
                endAngle={0}
                >
                <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='uv' />
                <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                <Tooltip content={entry => renderTooltip(entry)} />
            </RadialBarChart>

        </div>
    )
}

export default ProgramRadialBar