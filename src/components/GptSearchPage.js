import React from 'react'
import { BODY_IMG } from '../utils/constants'
import GptMovieSuggestions from './GptMovieSuggestions'
import GptSearchBar from './GptSearchBar'

const GptSearchPage = () => {
  return (
    <div>
      <div className=' absolute -z-10' > 
          
            <img src={BODY_IMG}
            alt='logo'/>
        </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
  )
}

export default GptSearchPage