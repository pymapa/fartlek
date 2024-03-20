import { getAccessToken } from "@/app/lib/auth";
import { getActivity } from "@/app/lib/client/strava";
import React from "react";
import ActivityMap from "./ActivityMap";
import HiglightStats from "./HighlightStats";
import Laps from "./Laps";

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
      <div className="w-full md:w-1/3 rounded-lg bg-neutral mb-8">
        <HiglightStats activity={activity} />
      </div>
      {activity.map.summary_polyline && (
        <div className="h-80 md:h-auto w-full md:w-2/3 md:pl-4 mb-8">
        <ActivityMap activity={activity} />
        </div>
      )}
      <div className="w-full rounded-lg bg-neutral">
        <Laps activity={activity} />
      </div>
    </div>
  );
};

export default Activity;
