import React from "react";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';


const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor}) => {

    return (

        <ResponsiveContainer width="100%" height={300}>

            <PieChart>
                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={showTextAnchor ? { position: 'inside', fill: '#fff', fontWeight: 'bold' } : false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />

                {showTextAnchor && (

                    <>
                        <text
                            x="50%"
                            y="50%"
                            dy={-25}
                            textAnchor="middle"
                            fill="#666"
                            fontSize="14px"
                        >

                            {label}

                        </text>

                        <text
                            x="50%"
                            y="50%"
                            dy={15}
                            textAnchor="middle"
                            fill="#333"
                            fontSize="20px"
                            fontWeight="600"
                        >
                            {value}

                        </text>
                    </>

                )}





            </PieChart>

        </ResponsiveContainer>


    )


}

export default CustomPieChart;