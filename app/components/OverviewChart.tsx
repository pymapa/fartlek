import React from 'react'
import { getAccessToken } from '../lib/auth';
import { StravaQueryArgs, getActivities } from '../lib/client/strava';

const getLastMonthActivities = async (accessToken: string): Promise<Array<ActivitySummary>> => {
  const args: StravaQueryArgs = {
    after: Math.floor(Date.now() / 1000) - 2592000,
    page: 1,
    per_page: 10,
  };
  return await getActivities(accessToken, args);
}

const OverviewChart = async () => {
  const token = await getAccessToken();
  const activities = await getLastMonthActivities(token);

  return (
    <div>
      <h1>Chart</h1>
    </div>
  )
}

export default OverviewChart
