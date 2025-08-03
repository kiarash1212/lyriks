import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Searchbar = () => {

  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    navigate(`/search/${searchText}`)
  }

  return (
  <form onSubmit={handleSubmit} className="p-2 text-gray-600 focus-within:text-gray-300">
    <label htmlFor="serach-field" className="sr-only">
      Search All songs
    </label>

    <div className="flex flex-row justify-start items-center">
      <FaSearch className="w-4 h-4 ml-4"/>
      <input 
    type="search"
    autoComplete="off"
    id="search-field"
    placeholder="Search"
    value={searchText}
    onChange={(e) => {setSearchText(e.target.value)}}
    className="flex-1 bg-transparent borde-none outline-none placeholder-gray-500 text-white text-base p-4"
    />
    </div>
    
  </form>
  )
};

export default Searchbar;
