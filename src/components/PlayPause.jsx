import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa'

const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) => (
  isPlaying && activeSong?.id === song.id ? (<FaPauseCircle 
    className='text-gray-300' 
    size={35} 
    onClick={handlePause}/>)
  : (<FaPlayCircle 
    className='text-gray-300 ' 
    size={35} 
    onClick={handlePlay}/>)
);

export default PlayPause;
