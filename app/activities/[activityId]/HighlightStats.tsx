import { ActivityDetails, SportType } from "@/app/lib/types/strava";

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
    <div className="flex flex-wrap w-full justify-between">
      <Stat value={activity.max_heartrate.toString()} label="Max HR" />
      <Stat value={activity.average_heartrate.toString()} label="Avg HR" />
      {showDistance && (
        <Stat value={(activity.distance / 1000).toFixed(2) + " km"} label="Distance" />
      )}
      {showElevation && (
        <Stat value={activity.total_elevation_gain.toFixed(1) + " m"} label="Elevation" />
      )}
      <Stat value={(activity.moving_time / 60).toFixed() + " min"} label="Moving Time" />
      <Stat value={activity.average_speed.toFixed(2) + " km/h"} label="Avg Speed" />
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="stat w-full md:w-1/3">
      <div className="stat-value text-accent">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default HiglightStats;