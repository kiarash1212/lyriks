import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Error, Loader, SongCard} from '../components'
import {genres} from '../assets/constants'

import {useSearchQuery} from '../redux/services/shazamCore'
import { useState } from 'react'


const Search = () => {
    const {searchTerm} = useParams()
    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state) => state.player)

    const [genreTitle, setGenreTitle] = useState('POP');
    const {data, isFetching, error} = useSearchQuery(searchTerm)
    
    const songs = data?.tracks?.hits
    if (isFetching) return <Loader />
    if (error) return <Error />

    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center 
            sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='text-white font-bold text-3xl'>Search Result</h2>
                <select
                onChange={(e)=> {setGenreTitle(e.target.value)}}
                className='bg-black text-gray-300 p-3 text-sm
                rounded-lg outline-none sm:mt-0 mt-5'>
                    {genres.map(eachGenre => <option key={eachGenre.value} value={eachGenre.value}>{eachGenre.title}</option>)}
                </select>
            </div>
        
        <div className='flex flex-wrap sm:justify-start justify-center gap-8 mt-5'>
                    {songs?.slice(0,50).map((song,i) => {
                        
                        return(
                            <SongCard
                            key={song.id}
                            song={song}
                            i={i}
                            isPlaying={isPlaying}
                            activeSong={activeSong}
                            data={data}></SongCard>
                        )}
                    )}
                </div>
        </div>
    )
}

export default Search;
