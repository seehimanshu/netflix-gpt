import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstant'

const GptSearchBar = () => {
    const  langKey = useSelector((store)=> store.config.lang);
  return (
    <div className='pt-[8%] flex justify-center '>
        <form className=' w-1/2 bg-gray-400 grid grid-cols-12 rounded-xl'>
            <input 
                type="text" 
                className='p-4 m-4 col-span-9 rounded-lg' 
                placeholder={lang[langKey]?.gptSearchPlaceHolder}
            />
            <button className='col-span-3 py-2 m-4 px-4 bg-red-600 rounded-lg text-white'>{lang[langKey].search}</button>
            
        </form>
    </div>
  )
}

export default GptSearchBar