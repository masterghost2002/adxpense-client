import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
export default function BarChartGraph({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <XAxis 
        dataKey="month"
          tick={{
            angle: -90,
            textAnchor: 'end',
          }}
          height={60}
          interval={0}
        />
         <Tooltip />
        <Bar dataKey="amt" fill="#FF900E" />
      </BarChart>
    </ResponsiveContainer>
  );
}
