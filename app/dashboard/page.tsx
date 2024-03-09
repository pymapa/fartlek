"use server"
import React from 'react'
import OverviewChart from '../components/OverviewChart';
import { getAccessToken } from '../lib/auth';
import { ActivitySummary } from '../lib/types/strava';
import { StravaQueryArgs, getActivities } from '../lib/client/strava';
import LatestActivities from '../components/LatestActivities';
import DashboardItem from '../components/DashboardItem';


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
    <div className='flex flex-wrap items-start justify-between w-full'>
      <DashboardItem title='Last 30 days' width={2}>
        <OverviewChart activities={activities} />
      </DashboardItem>
      <DashboardItem title="Latest activities" width={1}>
        <LatestActivities activities={activities} />
      </DashboardItem>
    </div>
  )
}

export default Dashboard
