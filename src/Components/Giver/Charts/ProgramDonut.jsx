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
        
        // console.log(entry)


        if(entry.payload.length) {

                return(
                    <div>
                        <small>{entry.payload[0].payload.value} {entry.payload[0].payload.name}</small>
                    </div>
                )
            }

    
            return(
                <div>TEST</div>
            )
        
    }

    let tooltip = <Tooltip content={entry => renderTooltip(entry)} />


    return (

        <div>
            <PieChart width={200} height={200}>
                <Pie 
                    data={data}
                    dataKey="value" nameKey="name" 
                    cx="50%" cy="50%" 
                    innerRadius={50} 
                    outerRadius={70}
                    startAngle={0}
                    endAngle={180}
                    fill="#8884d8" 
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.name == "Items Needed" ? "#e2e1f6" : "#8884d8"} />)
                    }
                </Pie>
                {props.onDetails? tooltip : ''}
                
            </PieChart>

     
         </div>
    )
}

export default ProgramDonut



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