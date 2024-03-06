"use server"
import React from 'react'
import OverviewChart from '../components/OverviewChart';
import { getAccessToken } from '../lib/auth';
import { ActivitySummary } from '../lib/types/strava';
import { StravaQueryArgs, getActivities } from '../lib/client/strava';


const getLastMonthActivities = async (
  accessToken: string
): Promise<ActivitySummary[]> => {
  const args: StravaQueryArgs = {
    after: Math.floor(Date.now() / 1000) - 2592000,
  };
  return await getActivities(accessToken, args);
};

const Dashboard = async () => {

  const token = await getAccessToken();
  const activities = await getLastMonthActivities(token);

  return (
    <div className='flex flex-wrap justify-between w-full border border-black px-16 pt-32 '>
      <OverviewChart activities={activities} />
    </div>
  )
}

export default Dashboard
