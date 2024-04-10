import React from 'react';
import { ActivitySummary } from '../lib/types/strava';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDate, formatSeconds } from '../lib/utils';

type ActivityBarChartProps = {
  activities: ActivitySummary[];
  period: number
}

type ChartDataItem = {
  day: string;
  elapsed_time: number;
  activities: ActivitySummary[];
}
const ActivityChart = ({ activities, period }: ActivityBarChartProps) => {

  const generateLast30Days = () => {
    const now = new Date();
    return Array.from({ length: period }, (_, i) => {
      const day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - (i - 1)
      );
      return day.toISOString().split("T")[0];
    }).reverse();
  }

  const chartData: ChartDataItem[] = generateLast30Days().map(day => {
    const activitiesForDay = activities.filter(a => a.start_date.split("T")[0] === day);
    const elapsedTime = activitiesForDay.reduce((acc, a) => acc + a.elapsed_time, 0);
    return {
      day,
      elapsed_time: elapsedTime,
      activities: activitiesForDay
    }
  }
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
      >
        <XAxis dataKey="start_date" />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="elapsed_time" className="fill-cyan-800" />
      </BarChart>
    </ResponsiveContainer>
  )
}

const CustomTooltip = ({ active, payload }: any) => {
  // return null if no active payload
  if (!active
    || !payload
    || payload.length === 0
    || !payload[0].payload.activities
    || payload[0].payload.activities.length === 0) {
    return null;
  }

  if (active && payload && payload.length > 0) {
    const activities: ActivitySummary[] = payload[0].payload.activities as ActivitySummary[];
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <p>{formatDate(activities[0].start_date)}</p>
        <p>{formatSeconds(
          activities.reduce((acc, a) => acc + a.elapsed_time, 0)
        )}</p>
        <ul>
          {activities.map((a: ActivitySummary) => (
            <li key={a.id}>{a.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ActivityChart;