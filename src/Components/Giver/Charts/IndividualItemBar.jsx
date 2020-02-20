import React from 'react'
import {BarChart, ComposedChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer, Legend, CartesianGrid, Area, Line} from 'recharts'

const IndividualItemBar = props => {
    let data
    let goal = ''
    let number = ''

      if(props.data) {
          data = props.data
      }

      if(data.length) {
        number = data[0].num
        goal = (data[0].togoal + data[0].num)
        console.log('number', number, 'goal', goal)
      }
      
    return (
        <div>
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
            <Bar dataKey="togoal" stackId="a" barSize={20} fill="#e2e1f6" />
    
        </ComposedChart>
        <p>{number}/{goal}</p>
        </div>
    );
  }


export default IndividualItemBar