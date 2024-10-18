"use client"

import { app } from '@/firebase';
import { addDoc, collection, getFirestore, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
// import Moment from 'react-moment';
// import Moment from 'react-moment'

const CommentSection = ({id}) => {
    const { data: session } = useSession();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const db = getFirestore(app);

    async function handleSubmit (e) {
      e.preventDefault();
      const commentToPost = comment;
      setComment('');
      // add comment to fireStore
      await addDoc(collection(db, 'posts', id, 'comments'),{
        comment: commentToPost,
        username: session?.user?.username,
        userImage: session?.user?.image,
        timeStamp: serverTimestamp(),
      });
      
    }

    useEffect(()=>{
      onSnapshot(collection(db, 'posts', id, 'comments'), (snapshot)=>{
        setComments(snapshot.docs)
      } );
    },[db]);


  return (
    <div>
      {
        comments.length > 0 && (
          <div className='mx-10 max-h-24 overflow-y-scroll'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex items-center space-x-2 mb-2'>
                <img src={comment.data().userImage} alt="userImage" className='h-7 rounded-full border p-[2px]' />
                <p className='text-sm'>
                  <span className='font-bold mr-2'>{comment.data().username}</span>
                  {' '}{comment.data().comment}
                </p>
                {/* <Moment fromNow>{comment.data().timeStamp?.toDate()}</Moment> */}
              </div>
            ))}
          </div>
        )
      }
        {
            session && (
                <form onSubmit={handleSubmit} className='flex items-center p-4 gap-2'>
                    <img src={session.user.image} alt="user image" className='h-10 w-10
                    rounded-full border p-[4px] object-cover'/>
                    <input type="text"
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
                    placeholder='Add Comment...' 
                    className='border-none flex-1 focus:ring-0 outline-none w-[120px]'/>
                    <button disabled={!comment.trim()}
                            type='submit'
                            className='font-semibold text-blue-400 disabled:cursor-not-allowed
                            disabled:text-gray-4 mr-2'>Post</button>
                </form>
            )
        }
    </div>
  )
}

export default CommentSection