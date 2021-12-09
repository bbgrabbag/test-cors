//pureComponent is used for simple rendering purposes
import React, { PureComponent } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// all these in combo draw up the chart
//ScatterChart is imported as the indicated graph of choice
//Scatter is imported top draw the points
//XAxis and YAxis are imported for the horizontal and vertical axes respectively
//CartesianGrid is importrd to draw the rectangular coordinate system
//tooltip is impprted to reveal information about the chart on hover


const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

class ScatterGraph extends PureComponent {

  render() {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="city" name="city" />
          <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false}/>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export default ScatterGraph
