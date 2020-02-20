import React, {useState, useEffect} from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const ProgramDonut = props => {

   const data = [
        {
            "name": "To Goal",
            "value": (props.totalGoal - props.totalPurchased)
        },
        {
            "name": "Donated to Date",
            "value": props.totalPurchased
        }
    ]



    
    console.log('GOAL:', props.totalGoal, 'TOTALPURCHASED', props.totalPurchased, 'DATA', data)

    const RADIAN = Math.PI / 180

    const renderCustomLabel = ({
        cx, cy, percent, innerRadius, outerRadius, midAngle
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      

        return(
            <h1 x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                Test
            </h1>
        )
    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (


            <PieChart width={200} height={200}>
                <Pie 
                    data={data}
                    dataKey="value" nameKey="name" 
                    cx="50%" cy="50%" 
                    // innerRadius={60} 
                    outerRadius={70}
            
                    fill="#8884d8" 
                    // label
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.name == "To Goal" ? "#9994d9" : "#8884d8"} />)
                    }
                </Pie>
                <Tooltip />
            </PieChart>
 
    )
}

export default ProgramDonut



// export default ProgramDonut


// import CanvasJSReact from '../../lib/canvasjs.react'

// let CanvasJS = CanvasJSReact.CanvasJS
// let CanvasJSChart = CanvasJSReact.CanvasJSChart

// class ProgramDonut extends React.Component {
//     render() {
//         console.log(this.props.totalPurchased, this.props.totalGoal)
//         if(!this.props.totalPurchased || !this.props.totalGoal) {
//             return (<div></div>)
//         }

//         const options = {
//                 animationEnabled: true,
//                 title: {
//                     text: 'Num to goal'
//                 },
//                 subtitles: [{
//                     text: '71% Positive',
//                     verticalAlign: 'center',
//                     fontSize: 24,
//                     dockInsidePlotArea: true
//                 }],
//                 data: [{
//                     type: 'doughnut',
//                     showInLegend: true,
//                     indexLabel: '{name}: {y}',
//                     yValueFormatString: "#,###'%'",
//                     dataPoints: [
//                         {name: 'Unsatisfied', y: 45 },
//                         {name: 'Satisfied', y: 55}
//                     ]
//                 }]
//             }
//         return (

//             <div>
//                 <CanvasJSChart options = {options} />

//             </div>

//         )
//     }


// }

// export default ProgramDonut




// import * as V from 'victory'
// import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory'


// class ProgramDonut extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         percent: 25, data: this.getData(0)
//       };
//     }
  
//     componentDidMount() {
//         this.getData(this.state.percent + 25)
//         console.log(this.getData(this.state.percent + 25))
//     }

//     componentDidUpdate() {

//     }

//     //   let percent = 25;
//     //   this.setStateInterval = window.setInterval(() => {
//     //     percent += (Math.random() * 25);
//     //     percent = (percent > 100) ? 0 : percent;
//     //     this.setState({
//     //       percent, data: this.getData(percent)
//     //     });
//     //   }, 2000);
//     // }
  
//     // componentWillUnmount() {
//     //   window.clearInterval(this.setStateInterval);
//     // }
  
//     getData(percent) {
//       return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
//     }
  
//     render() {
//       return (
//         <div>
//           <svg viewBox="0 0 400 400" width="100%" height="100%">
//             <VictoryPie
//               standalone={false}
//             //   animate={{onEnter: {before: () => ({y:0})}}}
//               animate={{duration: 1000}}
//               width={400} height={400}
//               data={this.state.data}
//               innerRadius={120}
//               cornerRadius={25}
//               labels={() => null}
//               style={{
//                 data: { fill: ({ datum }) => {
//                   const color = datum.y > 30 ? "green" : "red";
//                   return datum.x === 1 ? color : "transparent";
//                 }
//                 }
//               }}
//             />
//             <VictoryAnimation duration={1000} data={this.state}>
//               {(newProps) => {
//                 return (
//                   <VictoryLabel
//                     textAnchor="middle" verticalAnchor="middle"
//                     x={200} y={200}
//                     text={`${Math.round(newProps.percent)}%`}
//                     style={{ fontSize: 45 }}
//                   />
//                 );
//               }}
//             </VictoryAnimation>
//           </svg>
//         </div>
//       );
//     }
//   }

//   export default ProgramDonut





// const ProgramDonut = props => {
//     console.log(props.totalPurchased)
//     console.log(props.totalGoal)

//     let [percent, setPercent] = useState(25)
//     let [data, setData] = useState([])

//     useEffect(() => {
//         if(props.totalPurchased && props.totalGoal) {
//             let percent = 25
//             let setStateInterval = window.setInterval(() => {
//                 percent += (Math.random() * 25)
//                 percent = (percent > 100) ? 0 : percent
//                 setPercent(25)
//                 setData(getData(percent))
//             }, 2000)

//             return window.clearInterval(setStateInterval)

//         }
//     })


//     const getData = (percent) => {
//         return [{ x: 1, y: percent}, {x: 2, y: 100-percent}]
//     }
    

          
//     if(!props.totalPurchased || !props.totalGoal) {
//         return (<div></div>)
//     }


//     return (
//         <div>
//             <svg viewBox="0 0 400 400" width="100%" height="100%">

//                 <VictoryPie 
//                     standalone = {false}
//                     animate={{duration: 1000}}
//                     width={400}
//                     height={400}
//                     data={data}
//                     innerRadius={120}
//                     cornerRadius={25}
//                     labels={() => null}
//                     style= {{
//                         data: {fill: ({ datum }) => {
//                             const color = datum.y > 30 ? "green" : "red"
//                             return datum.x === 1 ? color : "transparent"
//                         }
//                     }
//                     }}
//                 />
//                 <VictoryAnimation duration={1000} data={{percent, data}}>
//                     {(newProps) => {
//                         return (
//                             <VictoryLabel
//                                 textAnchor="middle" verticalAnchor="middle"
//                                 x={200} y={200}
//                                 text={`${Math.round(newProps.percent)}%`}
//                                 style={{ fontSize: 45 }}
//                                 />
//                         )
//                     }}
//                 </VictoryAnimation>
//             </svg>
//         </div>
//     )
// }

// export default ProgramDonut