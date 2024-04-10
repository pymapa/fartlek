"use client";
import React from "react";
import { ActivitySummary } from "../lib/types/strava";
import Link from "next/link";
import { formatDate, formatSeconds } from "../lib/utils";

const LatestActivities = ({
  activities,
}: {
  activities: ActivitySummary[];
}) => {
  const getLatestActivities = (activities: ActivitySummary[]) => {
    return activities
      .sort((a, b) => {
        return (
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
        );
      })
      .slice(0, 8);
  };

  return (
    <div className="w-full h-full pb-4">
      <div className="w-full h-full overflow-scroll">
        {getLatestActivities(activities).map((activity) => (
          <ActivityRow activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
};

const ActivityRow = ({ activity }: { activity: ActivitySummary }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden flex justify-between py-4 border-b border-b-neutral-content"
    >
      <div>
        <h3 className="text-accent font-bold">{activity.name}</h3>
        <p>
          {formatDate(activity.start_date)}
        </p>
      </div>
      <div>
        <p>
          {formatSeconds(activity.moving_time)}
        </p>
      </div>
      <OverlayButton visible={isHovered} activityId={activity.id} />
    </div>
  );
};

const OverlayButton = ({
  visible,
  activityId,
}: {
  visible: boolean;
  activityId: number;
}) => {
  return (
    <Link
      href={`/activities/${activityId}`}
      prefetch
      className={`
      ${
        visible
          ? "w-40 right-0 border-l border-neutral-content"
          : "w-0 -right-full p-0 "
      }
      absolute 
      flex items-center justify-center
      text-neutral-content
      bg-neutral
      bg-opacity-60
      hover:bg-opacity-90
      hover:text-accent
      backdrop-blur-sm
      rounded-none
      transition-all 
      duration-300 
      top-0 h-full 
      shadow-md
      `}
    >
      <p>View activity</p>
    </Link>
  );
};

export default LatestActivities;
