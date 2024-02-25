import Link from 'next/link'
import React from 'react'

const NavLinks = () => {
  return (
    <ul className='menu'>
      <li className='disabled'><Link href={"/activities"}>Activities</Link></li>
      <li className='disabled'><Link href={"/statistics"}>Statistics</Link></li>
    </ul>
  )
}

export default NavLinks
