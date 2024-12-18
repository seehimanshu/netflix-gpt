import React, { useRef, useState } from 'react';
import checkValidateData from '../utils/validate';
import Header from './Header';
import { auth } from '../utils/fireBase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';

const Login = () => {
    const[IsSignInForm,setIsSignInForm]=useState(true);
    const[ErrorMessage,setErrorMessage]=useState(null);
    const navigate= useNavigate();
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
                    displayName: FullName.current.value, photoURL: "https://www.google.com/imgres?q=food%20app%20logo&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Ffood-ordering-app-logo-with-points-fork-shapes-center_666184-195.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Ffood-ordering-app-logo-with-points-fork-shapes-center_38183735.htm&docid=JJfY7bmuofLlJM&tbnid=k9_pZ-l-HHmOvM&vet=12ahUKEwix6cne3LGKAxXu1jgGHXtsDdkQM3oECBUQAA..i&w=626&h=626&hcb=2&ved=2ahUKEwix6cne3LGKAxXu1jgGHXtsDdkQM3oECBUQAA"
                  }).then(() => {
                    // Profile updated!
                    const {uid,email,displayName ,photoURL} = auth.currentUser;
                    dispatch(addUser({ uid:uid, email:email, displayName:displayName , photoURL:photoURL, }));
                    navigate("/browse")
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
                console.log(user);
                navigate("/browse")
                
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
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg'
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