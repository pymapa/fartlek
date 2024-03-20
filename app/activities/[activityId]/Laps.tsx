import { ActivityDetails, Lap, SportType } from "@/app/lib/types/strava";
import { formatSeconds, formatSpeed } from "@/app/lib/utils";
import React from "react";

const Laps = ({ activity }: { activity: ActivityDetails }) => {
  const isRun = activity.sport_type === "Run";
  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap w-full justify-between p-2 border-b border-accent">
        <div className="w-1/12">
          <p>Lap</p>
        </div>
        <div className="w-2/12">
          <p>Distance</p>
        </div>
        <div className="w-2/12">
          <p>Time</p>
        </div>
        <div className="w-2/12">
          <p>Avg HR</p>
        </div>
        <div className="w-2/12">{isRun ? <p>Pace</p> : <p>Speed</p>}</div>
      </div>
      {activity.laps.map((lap) => (
        <LapRow key={lap.id} lap={lap} activityType={activity.sport_type} />
      ))}
    </div>
  );
};

const LapRow = ({
  lap,
  activityType,
}: {
  lap: Lap;
  activityType: SportType;
}) => {
  return (
    <div className="flex flex-wrap w-full justify-between p-2 border-b border-neutral-content">
      <div className="w-1/12">
        <p>{lap.lap_index}</p>
      </div>
      <div className="w-2/12">
        <p>{(lap.distance / 1000).toFixed(2)} km</p>
      </div>
      <div className="w-2/12">
        <p>{formatSeconds(lap.elapsed_time)}</p>
      </div>
      <div className="w-2/12">
        <p>{lap.average_heartrate.toFixed()}</p>
      </div>
      <div className="w-2/12">
        <p>{formatSpeed(lap.average_speed, activityType, true)}</p>
      </div>
    </div>
  );
};

export default Laps;
