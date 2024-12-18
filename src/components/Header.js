import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/fireBase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const navigate=useNavigate();
  const user =useSelector((store) => store.user)
  
  
  const handleSignOut =()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/")
    }).catch((error) => {
      // An error happened.
      console.error("Sign out error:", error);
      navigate("/error");
    });
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-44'
         src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'
         alt='logo'/>
         { user && (<div className='flex p-2'>
          <img className='w-12 h-12 ' src="https://occ-0-3213-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea"
          alt='user-icon'/>
          <button onClick={handleSignOut} className='font-bold text-white '>Sign out</button>
         </div>
        )}
    </div>
  )
}

export default Header;