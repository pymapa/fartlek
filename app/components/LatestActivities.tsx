import React from 'react'
import { ActivitySummary } from '../lib/types/strava'

const LatestActivities = ({activities}: {activities: ActivitySummary[]}) => {
  const getLatestActivities = (activities: ActivitySummary[]) => {
    // return three latest activities
    return activities.reverse().slice(0, 3);
  }

  return (
    <div className='w-full'>
      {getLatestActivities(activities).map((activity) => (
        <ActivityRow activity={activity} key={activity.id} />
      ))}
    </div>
  )
}

const ActivityRow = ({activity}: {activity: ActivitySummary}) => {
  return (
    <div className='flex justify-between py-4 border-b border-b-neutral-content'>
      <div>
        <h3>{activity.name}</h3>
        <p>{Intl.DateTimeFormat("fi-FI").format(new Date(activity.start_date))}</p>
      </div>
      <div>
        <p>{new Date(activity.moving_time * 1000).toISOString().substr(11, 8)}</p>
      </div>
    </div>
  )
}

export default LatestActivities
