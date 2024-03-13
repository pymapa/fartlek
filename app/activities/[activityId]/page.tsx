import { getAccessToken } from "@/app/lib/auth";
import { getActivity } from "@/app/lib/client/strava";
import { ActivityDetails, SportType } from "@/app/lib/types/strava";
import React from "react";
import ActivityMap from "./ActivityMap";

type ActivityProps = {
  params: {
    activityId: string;
  };
};

const Activity = async ({ params }: ActivityProps) => {
  const token = await getAccessToken();
  const activity = await getActivity(token, parseInt(params.activityId));

  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-16">
        <h1 className="text-3xl font-bold">{activity.name}</h1>
      </div>
      <div className="w-1/2">
        <ActivityMap activity={activity} />
      </div>
      <div className="w-1/2">
        <HiglightStats activity={activity} />
      </div>
    </div>
  );
};

const HiglightStats = ({ activity }: { activity: ActivityDetails }) => {
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

  return (
    <div className="">
      <div className="stat">
        <div className="stat-value text-accent">{activity.max_heartrate}</div>
        <div className="stat-label">Max HR</div>
      </div>
      <div className="stat">
        <div className="stat-value text-accent">
          {activity.average_heartrate}
        </div>
        <div className="stat-label">Avg HR</div>
      </div>
      {showDistance && (
        <div className="stat">
          <div className="stat-value text-accent">
            {(activity.distance / 1000).toFixed(2)} km
          </div>
          <div className="stat-label">Distance</div>
        </div>
      )}
      {showElevation && (
        <div className="stat">
          <div className="stat-value text-accent">
            {activity.total_elevation_gain.toFixed(1)} m
          </div>
          <div className="stat-label">Elevation</div>
        </div>
      )}
      <div className="stat">
        <div className="stat-value text-accent">
          {(activity.moving_time / 60).toFixed()} min
        </div>
        <div className="stat-label">Moving Time</div>
      </div>
      <div className="stat">
        <div className="stat-value text-accent">{activity.calories} kcal</div>
        <div className="stat-label">Calories</div>
      </div>
    </div>
  );
};

export default Activity;
