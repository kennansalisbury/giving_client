import React from 'react'
import {BarChart, ComposedChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, Legend, CartesianGrid, Area, Line} from 'recharts'

const IndividualItemBar = props => {
    const data = [
        {
          name: 'Item', num: 50, goal: 100
        }
      ];


    return (

        <ComposedChart
            layout="vertical"
            width={100}
            height={50}
            data={data}
            margin={{
            top: 5, right: 5, bottom: 5, left: 5,
            }}
        >
    
            <XAxis type="number" hide={true} />
            <YAxis dataKey="name" type="category" hide={true}/>
            {/* <Tooltip /> */}
            {/* <Legend /> */}
            
            <Bar dataKey="num" stackId="a" barSize={20} fill="#413ea0" />
            <Bar dataKey="goal" stackId="a" barSize={10} fill="#e2e1f6" />
    
        </ComposedChart>

    );
  }


export default IndividualItemBar