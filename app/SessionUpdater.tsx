'use client'
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

const SessionUpdater = () => {
  const {update } = useSession();
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Updating session')
      update()
    }, 1000 * 60 * 5)
    return () => clearInterval(interval)
  }, [update])

  return (
    <></>
  )
}

export default SessionUpdater
