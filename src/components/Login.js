import React, { useRef, useState } from 'react';
import checkValidateData from '../utils/validate';
import Header from './Header';
import { auth } from '../utils/fireBase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import { BODY_IMG } from '../utils/constants';

const Login = () => {
    const[IsSignInForm,setIsSignInForm]=useState(true);
    const[ErrorMessage,setErrorMessage]=useState(null);
    
    const dispatch=useDispatch();


    const email=useRef(null);
    const password=useRef(null);
    const phoneNo=useRef(null);
    const FullName=useRef(null);

    const toggleSingInForm=()=>{
        setIsSignInForm(!IsSignInForm);
    }

    const handleButtonClick= ()=>{
          //validate the form data
        const message=checkValidateData(
            // Before accessing ref.current.value, add a conditional
            //  check to ensure the ref.current is not null
            email.current?.value || '',
            password.current?.value || '', 
            (!IsSignInForm) ? phoneNo.current?.value || '' : '',
            (!IsSignInForm) ? FullName.current?.value || '' : '',
        );
        setErrorMessage(message);

        if(message)return;

        //--------><------Sign /Sign Up logic------><------//
        
        if(!IsSignInForm){
            //sign up logic
            
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value,)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: FullName.current.value, 
                    photoURL: "https://example.com/path-to-default-avatar.jpg",
                  }).then(() => {
                    // Profile updated!
                    const {uid,email,displayName ,photoURL} = auth.currentUser;
                    dispatch(addUser({ uid:uid, email:email, displayName:displayName , photoURL:photoURL, }));
                    
                  }).catch((error) => {
                    // An error occurred
                    setErrorMessage(error.message);
                  });
                
            })
            .catch((error) => {
                const errorCode = error.code;
                
                const errorMessage = error.message;
                
                setErrorMessage(errorCode + "-" + errorMessage);
                
            });
        }
        else{
            // sign in logic
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
                
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                setErrorMessage(errorCode + "-" + errorMessage);
                // setErrorMessage("Please enter correct password")
            });
        }

        
    }
  return (
      
      <div>

        <div className=' absolute'> 
            <Header/>
            <img src={BODY_IMG}
            alt='logo'/>
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg ' >
            <h1 className='font-bold text-3xl py-4'>{IsSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!IsSignInForm && (
             <input ref={FullName}
                type="text" 
                placeholder="Full name" 
                className='p-4 my-4 w-full bg-gray-700'
             /> 
            )}
            {!IsSignInForm ? 
                <input ref={email} 
                    type="text" 
                    placeholder="Registe Your Email Address" 
                    className='p-4 my-4 w-full bg-gray-700'
                  /> :
                <input ref={email}
                    type="text" 
                    placeholder="Email Address" 
                    className='p-4 my-4 w-full bg-gray-700'
                  />
            }
            {!IsSignInForm && (
                <input ref={phoneNo}
                    type="tel" 
                    placeholder="Register Your Phone no" 
                    className='p-4 my-4 w-full bg-gray-700 '
                  /> 
            )}
            {!IsSignInForm ? 
                <input ref={password} 
                    type="password" 
                    placeholder=" Create Your Password" 
                    className='p-4 my-4 w-full bg-gray-700 '/> :
                <input ref={password}
                    type="password" 
                    placeholder="Password" 
                    className='p-4 my-4 w-full bg-gray-700 '
                  />
            }
            <p className='text-red-500 font-bold text-lg py-2'>{ErrorMessage}</p>
            <button 
                className='p-4 my-6 bg-red-700 w-full rounded-lg' 
                onClick={handleButtonClick}
               > 
               {IsSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' 
                onClick={toggleSingInForm}
               >
                {IsSignInForm ? "New to netflix? Sign up Now" : "Already registered? Sign In Now"}
            </p>
        </form>
      </div>
   
  )
}

export default Login;