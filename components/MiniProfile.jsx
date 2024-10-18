"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
const MiniProfile = () => {
    const { data:session } = useSession();
  return (
    <div className='flex items-center justify-between mt-14 ml-10 w-full'>
        <img 
        src={session?.user?.image || ""}
        alt={session?.user?.name || "Login"}
        className='w-16 h-16 rounded-full border p-[2px]' />

        <div className='flex-1 ml-4'>
            <h2 className='font-bold'>{session?.user?.name || "your name here"}</h2>
            <h3 className='text-sm text-gray-400'>{session?.user?.email || "you@email.com"}</h3>
        </div>
        {session?(
            <button 
            onClick={signOut}
            className='text-blue-500 text-sm font-semibold m-3'
            >Sign Out</button>
        ):( <button 
            onClick={signIn}
            className='text-blue-500 text-sm font-semibold m-3'
            >Sign In</button>)}
    </div>
  )
}

export default MiniProfile