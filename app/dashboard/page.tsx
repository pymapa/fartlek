"use server"
import React from 'react'
import Overview from './Overview';
import { getAccessToken, getLoggedInAthlete } from '../lib/auth';
import { ActivitySummary } from '../lib/types/strava';
import { StravaQueryArgs, getActivities, getStats } from '../lib/client/strava';
import LatestActivities from './LatestActivities';
import DashboardItem from './DashboardItem';
import ActivityTypes from './ActivityTypes';
import Statistics from './Statistics';

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
  const athlete = await getLoggedInAthlete();
  const activities = await getLastMonthActivities(token);
  const stats = await getStats(athlete.id, token);

  return (
    <div className='flex flex-wrap items-start justify-between w-full'>
      <DashboardItem title='Last 30 days' width={2}>
        <Overview activities={activities} />
      </DashboardItem>
      <DashboardItem title="Latest activities" width={1}>
        <LatestActivities activities={activities} />
      </DashboardItem>
      <DashboardItem title="Activity types" width={1}>
        <ActivityTypes activities={activities} />
      </DashboardItem>
      <DashboardItem title="Year to Date" width={2}>
        <Statistics stats={stats} />
      </DashboardItem>
    </div>
  )
}

export default Dashboard
