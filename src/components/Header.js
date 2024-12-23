import React, { useEffect } from 'react'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/fireBase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/UserSlice';
import { LOGO, SUPPORTED_LANGUAGE, USER_AVTAR } from '../utils/constants';
import { toggleGptSearchView } from '../utils/GptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const user =useSelector((store) => store.user)
  const showGptSearch =useSelector((store)=> store.gpt.showGptSearch);

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
        // console.log(user);
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
  const handleGptSearchClick = ()=>{
      dispatch(toggleGptSearchView());
  }
  const handleLanguageChange =(e)=>{
    
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className=' absolute top-0 left-0 w-full px-8 py-2 bg-gradient-to-b from-black z-50 flex justify-between items-center'>
        <img className='w-40'
         src={LOGO}
         alt='logo'/>
         { user && (<div className='flex p-2'>
           {showGptSearch && <select className='p-2 bg-gray-900 text-white ' onChange={handleLanguageChange}>
             {SUPPORTED_LANGUAGE.map((lang)=> 
              <option key={lang.identifier} 
                value={lang.identifier}>
                  {lang.name}
              </option>)}
             
             
           </select>}
           <button onClick={handleGptSearchClick}
           className='py-2 px-4  bg-purple-900 text-white rounded-lg mx-4 bg-opacity-70'>{showGptSearch ? "Home page" : "GPT Search"}</button>
          <img className='w-10 h-10 rounded-lg' src={USER_AVTAR || user.photoURL}
          alt='user-icon'/>
          <button  onClick={handleSignOut} className=' font-bold text-white hover: bg-opacity-50 '>Sign out</button>
          
         </div>
         
        )}
    </div>
  )
}

export default Header;