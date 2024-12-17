import React, { useRef, useState } from 'react'
import checkValidateData from '../utils/validate';
import Header from './Header';
// import {checkValidateData} from '../utils/validate';

const Login = () => {
    const[IsSingInForm,setIsSingInForm]=useState(true);
    const[ErrorMessage,setErrorMessage]=useState(null);

    const email=useRef("undefine");
    const password=useRef("undefine");
    const phoneNo=useRef("undefine");
    const FullName=useRef("undefine");

    const toggleSingInForm=()=>{
          setIsSingInForm(!IsSingInForm);
    }

    const handleButtonClick= ()=>{
          //validate the form data
        const message=checkValidateData(email.current.value,password.current.value,phoneNo.current.value,FullName.current.value);
        setErrorMessage(message);

        console.log(FullName.current.value)

        // Sign /Sign Up
    }
  return (
      
      <div>

        <div className=' absolute'> 
            <Header/>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg'
            alt='logo'/>
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg ' >
            <h1 className='font-bold text-3xl py-4'>{IsSingInForm ? "Sign In" : "Sign Up"}</h1>
            {!IsSingInForm && 
             <input ref={FullName}
                type="text" 
                placeholder="Full name" 
                className='p-4 my-4 w-full bg-gray-700'
             />
            }
            {!IsSingInForm ? 
                <input ref={email} 
                    type="text" 
                    placeholder="Registe Your Email Address" 
                    className='p-4 my-4 w-full bg-gray-700'
                  /> :
                <input 
                    type="text" 
                    placeholder="Email Address" 
                    className='p-4 my-4 w-full bg-gray-700'
                  />
            }
            {!IsSingInForm ? 
                <input ref={phoneNo}
                    type="tel" 
                    placeholder="Register Your Phone no" 
                    className='p-4 my-4 w-full bg-gray-700 '
                  /> :""
            }
            {!IsSingInForm ? 
                <input ref={password} 
                    type="password" 
                    placeholder=" Create Your Password" 
                    className='p-4 my-4 w-full bg-gray-700 '/> :
                <input 
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
               {IsSingInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' 
                onClick={toggleSingInForm}
               >
                {IsSingInForm ? "New to netflix? Sign up Now" : "Already registered? Sign In Now"}
            </p>
        </form>
      </div>
   
  )
}

export default Login;