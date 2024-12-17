import React, { useState } from 'react'
import Header from './Header';

const Login = () => {
    const[IsSingInForm,setIsSingInForm]=useState(true);
    const toggleSingInForm=()=>{
          setIsSingInForm(!IsSingInForm);
    }
  return (
      
      <div>

        <div className=' absolute'> 
            <Header/>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg'
            alt='logo'/>
        </div>
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80 rounded-lg ' >
            <h1 className='font-bold text-3xl py-4'>{IsSingInForm ? "Sing In" : "Sing Up"}</h1>
            {!IsSingInForm && <input type="text" placeholder="Full name" className='p-4 my-4 w-full bg-gray-700'/>}
            {!IsSingInForm? <input type="text" placeholder="Registe Your Email Address" className='p-4 my-4 w-full bg-gray-700'/> :<input type="text" placeholder="Email Address" className='p-4 my-4 w-full bg-gray-700'/>}
            {!IsSingInForm ? <input type="tel" placeholder="Register Your Phone no" className='p-4 my-4 w-full bg-gray-700 '/> : ""}
            {!IsSingInForm ? <input type="password" placeholder=" Create Your Password" className='p-4 my-4 w-full bg-gray-700 '/> :<input type="password" placeholder="Password" className='p-4 my-4 w-full bg-gray-700 '/>}
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg'> {IsSingInForm ? "Sing In" : "Sing Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSingInForm}> {IsSingInForm ? "New to netflix? Sing up Now" : "Already registered? Sing In Now"}</p>
        </form>
      </div>
   
  )
}

export default Login;