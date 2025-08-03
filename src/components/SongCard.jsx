import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice.js";
const SongCard = ({song, i, activeSong, isPlaying, data}) => {

  const dispatch = useDispatch()

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }
  
  return(
  <div className="flex flex-col w-[250px] p-4 bg-white/5 opacity-80 
  backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className="relative w-full group">
        <div className={`absolute inset-0 h-56 justify-center 
        items-center bg-black bg-opacity-50 group-hover:flex
        ${(activeSong.id || activeSong.key) === (song.id || song.key) ? 
          'flex bg-opacity-70': 'hidden'}`} >
          <PlayPause 
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
          isPlaying={isPlaying}
          activeSong={activeSong}/>
          </div>


          <img alt='song-image' src={song.attributes?.artwork.url.replace('{w}', '250').replace('{h}', '250')}/>

          <div className="mt-4 flex flex-col">
            <p className="font-semibold text-lg text-white 
            truncate">
              <Link to={`/songs/${song?.id}`}>
              {song.attributes?.name || song.heading?.title  || 'No Name'}
              </Link>
            </p>
            <p className="text-sm text-gray-200 truncate">
              <Link to={`/artists/${song.relationships?.artists.data[0]?.id}`}>
              {song.attributes?.composerName || song.heading?.subtitle}
              </Link>
            </p>
          </div>
    </div>
  </div>
  )
};

export default SongCard;
