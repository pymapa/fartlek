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

  const removeTimeFromDate = (date: string): string => {
    return date.split("T")[0];
  }

  const getXAxis = (): string[] => {
    const now = new Date();
    const days = Array.from({ length: 30 }, (_, i) => {
      const day = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - i
      );
      return day.toISOString().split("T")[0];
    });
    return days.reverse();
  };

  const container = d3
    .select("#overview_chart")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 500");

  const xScale = d3
    .scaleBand()
    .domain(getXAxis())
    .rangeRound([0, 960]);
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

  if (!activities) {
    return <p>No activities found</p>;
  }

  return (
    <div className="">
      <svg id="overview_chart" className=""></svg>
    </div>
  )
};

export default OverviewChart;
