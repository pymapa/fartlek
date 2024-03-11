import { ActivitySummary } from "@/app/lib/types/strava";
import Link from "next/link";
import React from "react";

type ActivitiesListProps = {
  activities: ActivitySummary[];
};

const ActivitiesList = ({ activities }: ActivitiesListProps) => {
  return (
    <div className="flex flex-col w-full overflow-y-scroll">
        {activities.map((activity) => (
          <ActivityRow key={activity.id} activity={activity} />
        ))}
    </div>
  );
};

type ActivityRowProps = {
  activity: ActivitySummary;
};

const ActivityRow = ({ activity }: ActivityRowProps) => {
  return (
    <Link href={`/dashboard/activities/${activity.id}`}>
      <div className="flex justify-between p-2 hover:bg-accent hover:text-accent-content border border-neutral">
        <div className="w-2/6">{activity.name}</div>
        <div className="w-1/6">{activity.sport_type}</div>
        <div className="w-1/6">{new Date(activity.moving_time * 1000).toISOString().substring(11, 19)}</div>
        <div className="w-1/6 text-end">{Intl.DateTimeFormat("fi-FI").format(new Date(activity.start_date))}</div>
      </div>
    </Link>
  );
};

export default ActivitiesList;
