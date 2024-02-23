import React, { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex min-w-screen min-h-screen border border-black'>
      <Sidebar />
      {children}
    </div>
  )
}

export default DashboardLayout
