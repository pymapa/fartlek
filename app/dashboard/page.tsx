"use server"
import React from 'react'
import { auth } from '../lib/auth';
import { StravaQueryArgs, getActivities, getAthlete } from '../lib/client/strava';

const Dashboard = async () => {
  const authSession = await auth();
  // @ts-ignore
  const accessToken = authSession?.token;
  // const athlete = await getAthlete(accessToken);

  const args: StravaQueryArgs = {
    after: Math.floor(Date.now() / 1000) - 2592000,
    page: 1,
    per_page: 10,
  };

  // const activities = await getActivities(accessToken, args);
  return (
    <div className='flex p-4'>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
