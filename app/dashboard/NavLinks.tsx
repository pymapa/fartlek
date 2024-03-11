import Link from 'next/link'
import React from 'react'

const NavLinks = () => {
  return (
    <ul className='menu'>
      <li className='active'><Link href={"/dashboard"}>Dashboard</Link></li>
      <li><Link href={"/dashboard/activities"}>Activities</Link></li>
      <li className='disabled'><Link href={"/dashboard/statistics"}>Statistics</Link></li>
    </ul>
  )
}

export default NavLinks
