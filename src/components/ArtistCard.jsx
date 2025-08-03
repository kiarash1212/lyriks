import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice.js";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore.js";
const ArtistCard = ({artistId}) => {

  const {data} = useGetArtistDetailsQuery(artistId)
  
  return(
  <div className="flex flex-col w-[250px] p-4 bg-white/5 opacity-80 
  backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className="relative w-full group">


    <img src={data?.data[0].attributes.artwork.url.replace('{w}', '250').replace('{h}', '250')}/>

          <div className="mt-4 flex flex-col items-center">
            <p className="text-xl text-white font-semibold">
              <Link to={`/artists/${artistId}`}>
              {data?.data[0].attributes.name}
              </Link>
            </p>
          </div>
    </div>
  </div>
  )
};

export default ArtistCard;
