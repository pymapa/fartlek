import { getAccessToken } from "@/app/lib/auth";
import { getActivity } from "@/app/lib/client/strava";
import React from "react";
import ActivityMap from "./ActivityMap";
import HiglightStats from "./HighlightStats";

type ActivityProps = {
  params: {
    activityId: string;
  };
};

const Activity = async ({ params }: ActivityProps) => {
  const token = await getAccessToken();
  const activity = await getActivity(token, parseInt(params.activityId));

  return (
    <div className="flex flex-wrap w-full md:w-4/5">
      {activity.map.summary_polyline && (
        <div className="h-80 w-full mb-14">
          <ActivityMap activity={activity} />
        </div>
      )}
      <div className="w-full mb-14">
        <h1 className="text-3xl font-bold">{activity.name}</h1>
      </div>
      <div className="w-full rounded-lg bg-neutral">
        <HiglightStats activity={activity} />
      </div>
    </div>
  );
};

export default Activity;
