'use client'
import { ActivityDetails, SportType } from "@/app/lib/types/strava";
import { formatSeconds, metersPerSecondToKmPerHour, metersPerSecondToMinPerKm } from "@/app/lib/utils";
import { useEffect } from "react";

const HiglightStats = ({ activity }: { activity: ActivityDetails }) => {
  const isRun = activity.sport_type === "Run";
  const isRide = activity.sport_type === "Ride" || activity.sport_type === "VirtualRide";

  const distanceSportTypes: SportType[] = [
    "Run",
    "Swim",
    "Ride",
    "NordicSki",
    "Rowing",
    "Snowboard",
    "Swim",
    "VirtualRide",
    "VirtualRun",
    "Walk",
  ];
  const elevationSportTypes: SportType[] = [
    "Hike",
    "IceSkate",
    "InlineSkate",
    "MountainBikeRide",
    "NordicSki",
    "RockClimbing",
    "RollerSki",
    "Run",
    "Snowboard",
    "Snowshoe",
    "TrailRun",
    "Velomobile",
    "VirtualRide",
    "VirtualRun",
    "Walk",
  ];
  const showDistance = distanceSportTypes.includes(activity.sport_type);
  const showElevation = elevationSportTypes.includes(activity.sport_type);

  useEffect(() => {
    console.log("Activity", activity);
  }, [activity]);

  return (
    <div className="flex flex-wrap w-full justify-between">
       <div className="w-full p-4">
        <h1 className="text-3xl font-bold">{activity.name}</h1>
      </div>
      <Stat value={activity.max_heartrate.toString()} label="Max HR" />
      <Stat value={activity.average_heartrate.toString()} label="Avg HR" />
      {showDistance && (
        <Stat value={(activity.distance / 1000).toFixed(2) + " km"} label="Distance" />
      )}
      {showElevation && (
        <Stat value={activity.total_elevation_gain.toFixed(1) + " m"} label="Elevation" />
      )}
      <Stat value={formatSeconds(activity.moving_time)} label="Moving Time" />
      {isRun ? <Stat value={metersPerSecondToMinPerKm(activity.average_speed)} label="Avg Pace" /> : (
      <Stat value={metersPerSecondToKmPerHour(activity.average_speed) + " km/h"} label="Avg Speed" />
      )}
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="stat w-full md:w-1/2">
      <div className="stat-value text-accent">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default HiglightStats;