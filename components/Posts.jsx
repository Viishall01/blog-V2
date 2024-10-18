import { app } from '@/firebase'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import PostCard from '@/components/PostCard'
import React from 'react'

    async function Posts () {
    const db = getFirestore(app);
    // const q =  query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    // const querySnapshot = await getDocs(q);
    
    const q = collection(db, 'posts');
    const querySnapshot = await getDocs(q);
    

    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data() });
    });
    
  return (
    <div className=''>
        {data.map((post) => (
            <PostCard key={post.id} post={post}/>
            
        ))}
    </div>
  )
}

export default Posts