import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useGetTopChartQuery } from "../redux/services/shazamCore";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from 'swiper/modules';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import TopChartCard from "./TopChartCard";

import 'swiper/css';
import 'swiper/css/free-mode';



const TopPlay = () => {
  const dispatch = useDispatch()
  const {activeSong, isPlaying} = useSelector((state) => state.player)
  const {data} = useGetTopChartQuery()
  const divRef = useRef(0)

  const topSongs = data?.slice(0, 5)

  useEffect(() => {
    divRef.current.scrollIntoView({behavior:'smooth'})
  }, [])
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = ({song, i}) => {
    dispatch(setActiveSong({song, data, i}))
    dispatch(playPause(true))
  }

  return (
    <div className="">
    <div ref={divRef} className="ml-0 mb-0 flex flex-col flex-1 max-w-full xl:max-w-[400px] xl:ml-4">

      <div className="flex flex-row w-full items-center justify-between">
        <h2 className="text-white font-bold text-2xl">Top Charts</h2>
        
      </div>

      <div className="flex flex-col mt-4 gap-3">
      {topSongs?.map((song, i) => (
        <TopChartCard 
        key={song.key}
        song={song}
        i={i}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick({song:song, i:i})}
        isPlaying={isPlaying}
        activeSong={activeSong}/>
          ))}
      </div>
    </div>


    <div className="flex flex-col gap-1 mt-2 xl:max-w-[400px]">

      <div className="flex flex-row w-full items-center justify-between">
        <h2 className="text-white font-bold text-2xl">Top Artists</h2>
        <Link to='/top-charts' className="text-base cursor-pointer text-gray-300">
        See more
        </Link>
      </div>
      
      <Swiper 
         slidesPerView={'auto'}
         spaceBetween={15}
         freeMode={true}
         centeredSlides
         centeredSlidesBounds
         modules={[FreeMode]}
         className="mt-4" >
         {topSongs?.map((song, i) => (
         <SwiperSlide 
              key={song.key}
              style={{width:'25%', height:'auto'}}
              className="rounded-full shadow-lg animate-slideright"
              >
              <Link to={`/artists/${song?.relationships.artists.data[0].id}`}>
                <img src={song?.attributes.artwork.url.replace('{w}', '250').replace('{h}', '250')} 
                className="rounded-full object-cover" />
              </Link></SwiperSlide>
         ))}
         </Swiper>
      
  </div>
  </div>
  )
}

export default TopPlay;
