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
    
    if(props.dashboard) {
     

        return(
            <div>
                <ComposedChart
                    layout="vertical"
                    width={150}
                    height={100}
                    data={data}
                    margin={{
                    top: 5, right: 5, bottom: 5, left: 5,
                    }}
                >
            
                    <XAxis type="number" hide={true} />
                    <YAxis dataKey="name" type="category" hide={true}/>
                    {/* <Tooltip /> */}
                    {/* <Legend /> */}
                    
                    <Bar dataKey="num" stackId="a" barSize={20} barGap={5} fill="#74b464" />
                    <Bar dataKey="togoal" stackId="a" barSize={20} fill="#d1e6cb" />
            
                </ComposedChart>
            </div>
        )
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
            
            <Bar dataKey="num" stackId="a" barSize={20} fill="#74b464" />
            <Bar dataKey="togoal" stackId="a" barSize={20} fill="#d1e6cb" />
    
        </ComposedChart>
        <p>{number}/{goal}</p> 
        </div>
    );
  }


export default IndividualItemBar