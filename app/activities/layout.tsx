import React, { ReactNode } from 'react'
import Sidebar from '../components/Sidebar'

const ActivitiesLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className='flex min-w-screen h-screen border border-black '>
    <Sidebar />
    <div className='
      px-4
      py-4
      md:px-16 
      md:py-16 
      w-full
      overflow-scroll'>
      {children}
    </div>
  </div>
  )
}

export default ActivitiesLayout
