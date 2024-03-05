"use client";
import React, { useEffect } from "react";
import { ActivitySummary } from "../lib/types/strava";
import * as d3 from "d3";

const dravChart = (activities: ActivitySummary[]) => {
  const getMaxElapsedTime = (activities: ActivitySummary[]) => {
    return activities.reduce(
      (max, a) => (a.elapsed_time > max ? a.elapsed_time : max),
      0
    );
  };

  const data = [12, 5, 6, 6, 9, 10];
  const container = d3
    .select("#overview_chart")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 500");

  const xScale = d3
    .scaleBand()
    .domain(activities.map((a) => a.start_date))
    .rangeRound([0, 960])
    .padding(0.1);
  const yScale = d3
    .scaleLinear()
    .domain([0, getMaxElapsedTime(activities)])
    .range([500, 0]);

  const bars = container
    .selectAll("rect")
    .data(activities)
    .enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", (a) => 500 - yScale(a.elapsed_time))
    .attr("x", (a) => xScale(a.start_date) || 0)
    .attr("y", (a) => yScale(a.elapsed_time));
};

const OverviewChart = ({ activities }: { activities: ActivitySummary[] }) => {
  useEffect(() => {
    dravChart(activities);
  }, [activities]);

  if (!activities) {
    return <p>No activities found</p>;
  }

  return (
    <svg id="overview_chart" className="w-2/4 h-56 border border-red-500"></svg>
  );
};

export default OverviewChart;
