import { useSelector } from 'react-redux'
import {Error, Loader, ArtistCard} from '../components'
import {genres} from '../assets/constants'

import {useGetTopChartQuery} from '../redux/services/shazamCore'
import { useState } from 'react'


const TopArtists = () => {
    const {activeSong, isPlaying} = useSelector((state) => state.player)

    const [genreTitle, setGenreTitle] = useState('POP');
    const {data, isFetching, error} = useGetTopChartQuery(genreTitle)
    
    
    if (isFetching) return <Loader />
    if (error) return <Error />

    return (
        <div className='flex flex-col'>
            <div className='w-full flex justify-between items-center 
            sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='text-white font-bold text-3xl'>Top Artists</h2>
                <select
                onChange={(e)=> {setGenreTitle(e.target.value)}}
                className='bg-black text-gray-300 p-3 text-sm
                rounded-lg outline-none sm:mt-0 mt-5'>
                    {genres.map(eachGenre => <option key={eachGenre.value} value={eachGenre.value}>{eachGenre.title}</option>)}
                </select>
            </div>
        
        <div className='flex flex-wrap sm:justify-start justify-center gap-8 mt-5'>
                {data?.slice(0,10).map((song,i) => {
                    return(
                        <ArtistCard
                        key={song.id}
                        artistId={song?.relationships.artists.data[0].id}></ArtistCard>
                    )}
                )}
                </div>
        </div>
    )
}

export default TopArtists;
