import { useParams } from "react-router-dom";
import { useGetSongDetails1Query,  useGetSongDetails2Query} from "../redux/services/shazamCore";
import {Error, Loader} from '../components'
import { useSelector, useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
const SongDetails = () => {

    const {songid} = useParams()
    let {data, isFetching, error} = useGetSongDetails2Query(songid)
    

    if (isFetching) return <Loader />
    if (error) return console.log(error)

    return (
    <div className="flex flex-col">
        <h2 className="text-gray-300 text-2xl">Lyrics :</h2>

        <div className="pl-2 flex flex-col gap-2">
            {data?.resources?.lyrics ? 
                data?.
                resources?.
                lyrics[Object.keys(data?.resources.lyrics)[0]]?.
                attributes?.
                text?.map(row => (
                    <p className="text-gray-400">-{row}</p>
                ))
                :
                <p className="text-red-500 text-2xl font-bold">Sorry no Lyrics</p>
            }
        </div>
    </div>
    )
}

export default SongDetails;
