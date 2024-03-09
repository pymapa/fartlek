import React, { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex min-w-screen min-h-screen border border-black '>
      <Sidebar />
      <div className='px-16 pt-32 w-full'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
