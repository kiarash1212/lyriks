import { Link } from "react-router-dom";
import PlayPause from './PlayPause'
const TopChartCard = ({song, i, handlePause, handlePlay, isPlaying, activeSong, artistId}) => (
  <div className="flex flex-row items-center w-full max-w-full
          rounded-lg cursor-pointer hover:bg-[#4c426e] p-2 justify-between">
    <div className="flex flex-row items-center">
    <h3 className="text-white font-bold mr-2">{i+1}.</h3>
    <img src={song?.attributes.artwork.url.replace('{w}', '250').replace('{h}', '250')} className="w-1/6 rounded-sm"/>
    <div className="flex flex-col p-2 w-2/3">
    <Link to={`/songs/${song?.id}`} className="text-base cursor-pointer text-gray-300">
        <h4 className="text-white font-bold justify-between py-2">{song?.attributes.name}</h4>
    </Link>
      
    <Link to={`/artists/${artistId || song?.relationships?.artists.data[0].id}`} className="text-base cursor-pointer text-gray-300">
        <h6 className="text-gray-300 max-h-max text-sm">
          {artistId ? song.attributes.albumName :song?.attributes.artistName}</h6>
    </Link>
      
    </div>
    </div>
      <PlayPause 
          song={song}
          handlePause={handlePause}
          handlePlay={handlePlay}
          isPlaying={isPlaying}
          activeSong={activeSong}/>
    
  </div>
)

export default TopChartCard