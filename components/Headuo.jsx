"use client"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import { signIn,signOut, useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineClose } from 'react-icons/ai'
import { HiCamera } from 'react-icons/hi'
import Modal from 'react-modal' 
import {app} from '@/firebase'
import Link from 'next/link'
// import { timeStamp } from 'console'
// import { error } from 'console'

const Headuo = () => {
    const [isOpen, setIsOpen] = useState(false); 
    const [selectedFile, setSelectedFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const [postUploading, setPostUploading] = useState(false);
    const [caption, setCaption] = useState('');
    const filePickerRef = useRef(null)
    const db = getFirestore(app);
    const { data:session } = useSession();
  

    function addImageToPost (e) {
      const file = e.target.files[0];
      if (file){
        setSelectedFile(file);
        setImageFileUrl(URL.createObjectURL(file));
        console.log(imageFileUrl);
      }
    }
    useEffect(()=>{
      if(selectedFile){
        uploadImageToStorage()
      }
    },[selectedFile]);

    async function uploadImageToStorage(){
      setImageFileUploading(true);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + selectedFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on('state_changed',(snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
        }, ( error ) => {
          console.error(error);
          setImageFileUploading(false);
          setImageFileUrl(null);
          setSelectedFile(null);
        }, () => {
              getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL)=>{
                setImageFileUrl(downloadURL);
                setImageFileUploading(false);
              });
        });
    };
    async function handleSubmit () {
      setPostUploading(true);
      const docRef = await addDoc(collection(db, 'posts'),{
        username : session.user.username,
        caption,
        profileImg: session.user.image,
        image: imageFileUrl,
        timeStamp: serverTimestamp(),
      });
      setPostUploading(false);
      setIsOpen(false);
      setSelectedFile(null);
      location.reload();
  
    }
    function addPost(e){
      const data = e.target.value;
      setCaption(data);
    }

  return (
  <div className="shadow-sm border-b sticky top-0 bg-white z-30">
    <div className='flex justify-between items-center max-w-6xl mx-auto'>
        <Link href='/about' className='text-1xl font-sans font-bold text-black border border-x-gray-600 rounded-full p-1 m-1'>V/<i>Log</i></Link>
        {/* <input type="text" placeholder='Search' className='bg-gray-50 border border-gray-200
        rounded text-sm py-2 px-4 w-full max-w-[210px] mx-2 outline-none '/> */}
        
        <a href="https://www.instagram.com/viishall.01/" className='cursor-pointer text-xs text-gray-400'>@viishall.01</a>

        {session ?( <div className='flex gap-1 items-center'>
          <IoMdAddCircleOutline onClick={()=>{
            setIsOpen(true);
          }} className='text-2xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-600'/>
          <img src={session?.user?.image} alt={session?.user?.name} onClick={signOut}
          className='h-9 w-9 rounded-full cursor-pointer m-1 border border-x-gray-600'/>
        </div> ):(
          <button className='text-sm font-semibold text-blue-500' onClick={signIn}>Login</button>)}

        {/* <button className='text-sm font-semibold text-blue-500' onClick={signOut}>Logout</button> */}
    </div>

    {isOpen &&(
      <Modal 
        isOpen={isOpen} 
        ariaHideApp={false}
        className='max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white
        border-2 rounded-md shadow-md outline-none'
        onRequestClose={()=>{
           setIsOpen(false);
           setPostUploading(false);
           setImageFileUploading(false);
           setSelectedFile(null)}}>
         <div className='flex flex-col justify-center items-center h-[100%]'>

        {selectedFile ? (
          <img src={imageFileUrl}onClick={()=>filePickerRef.current.click()} alt='selected file'
           className={`w-full max-h-[250px] object-contain cursor-pointer ${ imageFileUploading ?
            'animate-pulse' : ''
           }`}/>
        ):(
          <HiCamera onClick={()=>filePickerRef.current.click()} className='text-5xl text-gray-400
           cursor-pointer'/>
           )}
          <input
          type="text" 
          maxLength='150' 
          placeholder='Enter your caption...' 
          className='m-4 border-none text-center w-full outline-none font-serif'
          onChange={addPost} />
          <input hidden ref={filePickerRef} type="file" accept='image/*' onChange={addImageToPost} />

         </div>
         <button 
         onClick={handleSubmit}
         disabled={  postUploading || imageFileUploading}
         className='w-full bg-red-600 text-white p-2 shadow-md rounded-lg
         font-sans hover:brightness-110 disabled:bg-gray-200 disabled:cursor-not-allowed
         disabled:hover:brightness-100'>Upload Post</button>
         <AiOutlineClose className='cursor-pointer absolute top-2 right-2 hover:text-red-500
          transition duration-300' onClick={()=>{
            setIsOpen(false);
            setSelectedFile(null);}}/>
      </Modal>
    )}
  </div>
  )
}

export default Headuo