"use client";
import React from "react";
import { ActivitySummary } from "../lib/types/strava";
import Link from "next/link";

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
      .slice(0, 3);
  };

  return (
    <div className="w-full">
      {getLatestActivities(activities).map((activity) => (
        <ActivityRow activity={activity} key={activity.id} />
      ))}
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
          {Intl.DateTimeFormat("fi-FI").format(new Date(activity.start_date))}
        </p>
      </div>
      <div>
        <p>
          {new Date(activity.moving_time * 1000).toISOString().substr(11, 8)}
        </p>
      </div>
      <OverlayButton visible={isHovered} activityId={activity.id} />
    </div>
  );
};

const OverlayButton = ({ visible, activityId }: { visible: boolean, activityId: number }) => {
  return (
    <Link href={`/dashboard/activities/${activityId}`} prefetch className={`
      flex items-center justify-center
      text-neutral-content
      ${visible ? "w-40" : "-right-full p-0 w-0"}
      absolute 
      bg-neutral
      bg-opacity-60
      hover:bg-opacity-90
      hover:text-accent
      backdrop-blur-sm
      gap-0
      rounded-none
      transition-all 
      duration-300 
      top-0 h-full 
      right-0
      shadow-md
      border-l border-neutral-content
      `}>
        <p>View activity</p>
      
    </Link>
  );
};

export default LatestActivities;
