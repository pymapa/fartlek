import React from "react";
import { Stats } from "../lib/types/strava";
import { metersToKilometers } from "../lib/utils";

const Statistics = ({ stats }: { stats: Stats }) => {
  console.log(stats);
  return (
    <div className="flex flex-col h-full justify-between py-8 w-full">
      <StatRow label="Ride distance" value={metersToKilometers(stats.ytd_ride_totals.distance)} unit="km" />
      <StatRow label="Ride count" value={stats.ytd_ride_totals.count.toString()} unit="rides" />
      <StatRow label="Run distance" value={metersToKilometers(stats.ytd_run_totals.distance)} unit="km" />
      <StatRow label="Run count" value={stats.ytd_run_totals.count.toString()} unit="runs" />
    </div>
  )
};

const StatRow = ({ label, value, unit }: { label: string; value: string; unit: string }) => {
  return (
    <div className="flex items-center justify-between w-full mb-4 border-b border-cyan-800">
      <p className="text-sm">{label}</p>
      <p className="text-lg font-bold">{value} {unit}</p>
    </div>
  )
}

export default Statistics;
