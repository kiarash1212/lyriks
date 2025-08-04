import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetArtistTopSongsQuery } from "../redux/services/shazamCore";
import { Loader } from "../components";
import TopChartCard from "../components/TopChartCard";
import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
const ArtistDetails = () => {

  const dispatch = useDispatch()
  const {activeSong, isPlaying} = useSelector((state) => state.player)
  const {id:artistId} = useParams()
  const {data, isFetching} = useGetArtistTopSongsQuery(artistId)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = ({song, i}) => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  if (isFetching) return <Loader />
  return (
  <>
  <div className="flex flex-row gap-1 items-center w-full">
    
    <img src={data?.data[0].attributes.artwork.url.replace('{w}', '250').replace('{h}', '250')} 
    className="rounded-full object-cover w-1/5 border-white border-2"/>

    <h2 className="text-gray-200 text-2xl p-4 font-bold">{data?.data[0].attributes.artistName}</h2>
    
  </div>

  <div className="flex flex-col gap-3 mt-5">
    <h2 className="text-gray-400 text-xl font-semibold mb-2">Top songs :</h2>

    {data?.data.map((song,i) => (

      <TopChartCard
      key={song.id}
      song={song}
      i={i}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick({song:song, i:i})}
        isPlaying={isPlaying}
        activeSong={activeSong}
      artistId={artistId}
        />

    ))

    }
  </div>
  </>
  )
}

export default ArtistDetails;
