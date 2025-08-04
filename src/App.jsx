import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { FaArrowDown,FaArrowUp } from 'react-icons/fa';
import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import { useEffect, useState } from 'react';

const App = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [playerIsOpen, setPlayerIsOpen] = useState(true);

  useEffect(() => {
    if (isPlaying && !playerIsOpen) setPlayerIsOpen(true)
  }, [isPlaying])
  
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {(activeSong?.title || activeSong?.id) && (
        <div className={`fixed h-28 left-0 right-0 flex bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10
                        ${(playerIsOpen || isPlaying) ? "animate-slideup bottom-0" : "animate-slidedown -bottom-24"}`}>
          <button className='absolute z-10 right-4 -top-2 text-white bg-[#191624] p-2 rounded-full'
            onClick={() => setPlayerIsOpen(!playerIsOpen)}>
              {(playerIsOpen || isPlaying) ? <FaArrowDown size={18}/>:
              <FaArrowUp size={18}/>}</button>
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
