import React, { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'

const DashboardLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex min-w-screen min-h-screen border border-black '>
      <Sidebar />
      <div className='
        px-8
        pt-16
        md:px-16 
        md:pt-24
        w-full'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
