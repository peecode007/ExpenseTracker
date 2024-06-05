import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#8884d8" />
                <Bar dataKey="Spent" fill="#82ca9d" />
                <Bar dataKey="Remaining" fill="#ffc658" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BudgetChart;
