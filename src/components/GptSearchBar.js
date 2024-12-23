import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/GptSlice';
import lang from '../utils/languageConstant'
import client from '../utils/openAi';

const GptSearchBar = () => {
    const  langKey = useSelector((store)=> store.config.lang);
    const searchText =useRef(null);
    const dispatch=useDispatch();
    const fetchMovieTMDB = async(movie)=>{
        const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+
            movie +
            '&include_adult=false&language=en-US&page=1', 
            API_OPTIONS);
        const json = await data.json();

        return json.results;
    }

    const handleGptSearchClick =async (e)=>{
            e.preventDefault(); // Prevent form submission from reloading the page.

        try {
            
            const gptQuery="Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + " and only give me names of only 5 movies, coma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
            // Make API call to OpenAI
            const gptResults = await client.chat.completions.create({
                messages: [{ role: 'user', content: gptQuery }],
                model: 'gpt-3.5-turbo', 
            });

            const gptMovies=gptResults.choices?.[0]?.message?.content.split(",");

            const promiseArray= gptMovies.map((movie) => fetchMovieTMDB(movie));
            
            const tmdbResults = await Promise.all(promiseArray);

            dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));

        } catch (error) {
            console.error('Error fetching GPT results:', error);
        }
    }
  return (
    <div className='pt-[8%] flex justify-center '>
        <form className=' w-1/2 bg-gray-400 grid grid-cols-12 rounded-xl' 
            onSubmit={(e)=>e.preventDefault()}
            onClick={handleGptSearchClick}
        >
                <input 
                    ref={searchText}
                    type="text" 
                    className='p-4 m-4 col-span-9 rounded-lg' 
                    placeholder={lang[langKey]?.gptSearchPlaceHolder}
                />

                <button className='col-span-3 py-2 m-4 px-4 bg-red-600 rounded-lg text-white'>{lang[langKey].search}</button>
            
        </form>
    </div>
  )
}

export default GptSearchBar;