import React from 'react'
import Posts from '@/components/Posts'
import MiniProfile from '@/components/MiniProfile'

const Feed = () => {
  return (
     <main className='grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto'>
        {/* Posts */}
        <section className='md:col-span-2'>
            <Posts/>
        </section>

        {/* MiniProfile */}
        <section className='hidden md:inline-grid md:col-span-1'>
            <div className='fixed w-[380-px]'>
              <MiniProfile/>
            </div>
        </section>
     </main>
  )
}

export default Feed