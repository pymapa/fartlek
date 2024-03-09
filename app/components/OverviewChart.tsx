"use client";
import React, { useEffect } from "react";
import { ActivitySummary } from "../lib/types/strava";
import * as d3 from "d3";
import Link from "next/link";

const dravChart = (activities: ActivitySummary[]) => {
  const getMaxElapsedTime = (activities: ActivitySummary[]) => {
    return activities.reduce(
      (max, a) => (a.elapsed_time > max ? a.elapsed_time : max),
      0
    );
  };

  const removeTimeFromDate = (date: string): string => {
    return date.split("T")[0];
  };

  const getXAxis = (): string[] => {
    const now = new Date();
    const days = Array.from({ length: 30 }, (_, i) => {
      const day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - (i - 1)
      );
      return day.toISOString().split("T")[0];
    });
    return days.reverse();
  };

  const container = d3
    .select("#overview_chart")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 500");

  const xScale = d3.scaleBand().domain(getXAxis()).rangeRound([0, 960]);
  const yScale = d3
    .scaleLinear()
    .domain([0, getMaxElapsedTime(activities) - 50])
    .range([500, 0])
    .nice();

  container
    .selectAll("rect")
    .data(activities)
    .enter()
    .append("rect")
    .attr("width", 5)
    .attr("height", (a) => 500 - yScale(a.elapsed_time))
    .attr("x", (a) => xScale(removeTimeFromDate(a.start_date)) || 0)
    .attr("y", (a) => yScale(a.elapsed_time))
    .classed("fill-teal-700", true);
};

const OverviewChart = ({ activities }: { activities: ActivitySummary[] }) => {
  useEffect(() => {
    dravChart(activities);
  }, [activities]);

  const getCumulativeMinutes = (activities: ActivitySummary[]) => {
    return activities.reduce((acc, a) => acc + a.moving_time, 0);
  };

  if (!activities) {
    return <p>No activities found</p>;
  }

  return (
    <div className="flex">
      {/* Side panel */}
      <SidePanel activities={activities} />
      {/* Chart */}
      <svg
        id="overview_chart"
        className="border-b border-b-neutral-content"
      ></svg>
    </div>
  );
};

const SidePanel = ({ activities }: { activities: ActivitySummary[] }) => {
  const getCumulativeMinutes = (activities: ActivitySummary[]) => {
    return activities.reduce((acc, a) => acc + a.moving_time, 0);
  };

  return (
    <div className="w-2/5 flex-col pt-10 flex justify-between items-center">
      <div className="w-full">
        <div>
          <h3 className="font-extrabold text-3xl text-accent">
            {new Date(getCumulativeMinutes(activities) * 1000)
              .toISOString()
              .substring(11, 19)}
          </h3>
          <p>Cumulative moving time</p>
        </div>
      </div>
      <div className="w-full">
        <div>
          <h3 className="font-extrabold text-3xl text-accent">
            {activities.length}
          </h3>
          <p>Activities</p>
        </div>
      </div>
      <div className="w-full flex justify-start">
        <Link href={'/dashboard/activities'} className="btn">View all activities</Link>
      </div>
    </div>
  );
};

export default OverviewChart;
