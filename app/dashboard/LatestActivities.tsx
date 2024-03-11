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
          {new Date(activity.moving_time * 1000).toISOString().substring(11, 19)}
        </p>
      </div>
      <OverlayButton visible={isHovered} activityId={activity.id} />
    </div>
  );
};

const OverlayButton = ({ visible, activityId }: { visible: boolean, activityId: number }) => {
  return (
    <Link href={`/activities/${activityId}`} prefetch className={`
      ${visible ? "w-40 right-0 border-l border-neutral-content" : "w-0 -right-full p-0 "}
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
      `}>
        <p>View activity</p>
      
    </Link>
  );
};

export default LatestActivities;
