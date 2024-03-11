import { getAccessToken } from '@/app/lib/auth';
import { getActivity } from '@/app/lib/client/strava';
import React from 'react'

type ActivityProps = {
  params: {
    activityId: string;
  }
}

const Activity = async ({params}: ActivityProps) => {
  const token = await getAccessToken();
  const activity = await getActivity(token, parseInt(params.activityId));

  return (
    <div>
      <h2>Activity</h2>
    </div>
  )
}

export default Activity
