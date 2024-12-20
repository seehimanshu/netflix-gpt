import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/fireBase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/UserSlice';
import { LOGO, USER_AVTAR } from '../utils/constants';

const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user =useSelector((store) => store.user)
  // console.log(user.photoURL)
  // console.log(user);
  const handleSignOut =()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
      console.error("Sign out error:", error);
      navigate("/error");
    });
  }
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid,email,displayName ,photoURL} = user;
        dispatch(addUser({ uid:uid, email:email, displayName:displayName , photoURL:photoURL, }));
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unsubscribe when compenent unmount.
    return ()=> unsubscribe();
  },[]);
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-44'
         src={LOGO}
         alt='logo'/>
         { user && (<div className='flex p-2'>
          <img className='w-12 h-12 ' src={USER_AVTAR}
          alt='user-icon'/>
          <button  onClick={handleSignOut} className=' font-bold text-white hover: bg-opacity-50 '>Sign out</button>
          
         </div>
         
        )}
    </div>
  )
}

export default Header;