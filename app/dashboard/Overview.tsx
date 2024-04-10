"use client";
import React from "react";
import { ActivitySummary } from "../lib/types/strava";
import Link from "next/link";
import { formatSeconds } from "../lib/utils";
import ActivityChart from "./ActivityChart";


const Overview = ({ activities }: { activities: ActivitySummary[] }) => {

  if (!activities) {
    return <p>No activities found</p>;
  }

  return (
    <div className="flex h-full flex-wrap justify-between md:flex-nowrap">
      <SidePanel activities={activities} />
      <div className="w-full h-full flex items-end">
        <ActivityChart activities={activities} period={30} />
      </div>
    </div>
  );
};

const SidePanel = ({ activities }: { activities: ActivitySummary[] }) => {
  const getCumulativeMinutes = (activities: ActivitySummary[]) => {
    return activities.reduce((acc, a) => acc + a.moving_time, 0);
  };

  return (
    <div className="w-full md:w-2/5 flex-col pt-8 flex justify-between items-center">
      <div className="w-full">
        <div className="stat">
          <h3 className="stat-value text-accent">
            {formatSeconds(getCumulativeMinutes(activities))}
          </h3>
          <div className="stat-title">Cumulative moving time</div>
        </div>
      </div>
      <div className="w-full">
        <div className="stat">
          <div className="stat-value text-accent">
            {activities.length}
          </div>
          <div className="stat-title">Activities</div>
        </div>
      </div>
      <div className="w-full flex justify-start">
        <Link href={"/activities"} className="btn">
          View all activities
        </Link>
      </div>
    </div>
  );
};

export default Overview;
