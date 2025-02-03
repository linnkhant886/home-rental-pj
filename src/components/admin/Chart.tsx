"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from 'recharts';

type Props = {
  data: {
    date: string;
    count: number;
  }[];
};


export default function Chart({ data }: Props) {
    return (
      <section>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='date' />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey='count' fill='#F97215' barSize={75} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    );
  }
