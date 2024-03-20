"use client";
import React, { useCallback } from "react";
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";
import colors from 'tailwindcss/colors'
import { ActivitySummary } from "../lib/types/strava";

type ActivityTypesProps = {
  activities: ActivitySummary[];
};

const ActivityTypes = ({ activities }: ActivityTypesProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
  }, [setActiveIndex]);

  const activityTypes = activities.reduce((acc, activity) => {
    if (acc[activity.sport_type]) {
      acc[activity.sport_type] += 1;
    } else {
      acc[activity.sport_type] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  const data = Object.keys(activityTypes).map((type) => ({
    name: type,
    value: activityTypes[type],
  }));


  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={150} height={150}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={"50%"}
        cy={"50%"}
        innerRadius={60}
        outerRadius={80}
        fill={colors.cyan[800]}
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
      </PieChart>
    </ResponsiveContainer>
  );
};

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" className="fill-neutral-content">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        className="fill-neutral-content"
      >{`${payload.value}`}</text>
    </g>
  );
};


export default ActivityTypes;
