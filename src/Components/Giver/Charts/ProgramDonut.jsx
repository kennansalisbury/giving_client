import React, {useState, useEffect} from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'


const ProgramDonut = props => {

    let data = [
        {
            "name": "Items Needed",
            "value": (props.totalGoal - props.totalPurchased)
        },
        {
            "name": "Items Donated to Date",
            "value": props.totalPurchased
        }
    ]

    if(props.data) {
        data = props.data
    }

    const renderTooltip = (entry) => {

        if(entry.payload.length) {

                return(
                    <div>
                        <small>{entry.payload[0].payload.value} {entry.payload[0].payload.name}</small>
                    </div>
                )
            }

    
            return(
                <div></div>
            )
        
    }

    let tooltip = <Tooltip content={entry => renderTooltip(entry)} />


    return (

        <div>
            <PieChart width={200} height={150}>
                <Pie 
                    data={data}
                    dataKey="value" nameKey="name" 
                    cx="50%" cy="50%" 
                    innerRadius={50} 
                    outerRadius={70}
                    startAngle={0}
                    endAngle={180}
                    fill="#74b464" 
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.name == "Items Needed" ? "#d1e6cb" : "#74b464"} />)
                    }
                </Pie>
            
                {props.onDetails ? tooltip : ''}
                {/* {props.onDetails && tooltip} -- another option, but I feel is less intuitive from a readability perspective */}
                
            </PieChart>

     
         </div>
    )
}

export default ProgramDonut