"use server"
import React from 'react'
import OverviewChart from '../components/OverviewChart';


const Dashboard = async () => {

  return (
    <div className='flex flex-wrap p-4'>
      <OverviewChart />
    </div>
  )
}

export default Dashboard
