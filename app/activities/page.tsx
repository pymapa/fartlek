import { getAccessToken } from '@/app/lib/auth';
import { StravaQueryArgs, getActivities } from '@/app/lib/client/strava'
import React from 'react'
import ActivitiesList from './ActivitiesList';

const Activities = async () => {
  const accessToken = await getAccessToken();

  const queryArgs: StravaQueryArgs = {
    // page: 1,
    per_page: 200,
  };
  const activities = await getActivities(accessToken, queryArgs);
  return (
    <div className='flex w-full h-full'>
      <ActivitiesList activities={activities} />
    </div>
  )
}

export default Activities
