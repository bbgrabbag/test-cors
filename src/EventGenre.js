import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
  
  let EventGenre = ({events}) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#90681c'];
    let [data, setData] = useState([]);

    useEffect(() => {
    let getData = () => {
        let genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        
        let data = genres.map((genre)=>{
        let value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length;
        return {name: genre, value: value}
        });
        return data
    };
    setData(() => getData()); }, [events]);
    

      return (
        <ResponsiveContainer height={400}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    }

    export default EventGenre;

