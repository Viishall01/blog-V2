"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'


const Sessionu = ({children}) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )

}

export default Sessionu