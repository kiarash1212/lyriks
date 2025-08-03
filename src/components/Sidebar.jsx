import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo.svg'
import {links} from '../assets/constants'
import { HiOutlineMenu } from "react-icons/hi";
import {RiCloseLine} from "react-icons/ri"
const Sidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const handleMenuClick = () => setIsSideBarOpen(!isSideBarOpen)

  return (
  <>
  <div className="w-[220px] bg-[#201b2df0] hidden md:flex flex-col items-center p-1 ">  
    <img src={logo} className="w-[150px]" /> 

    <div className="flex flex-col items-start justify-start mt-4 w-full p-2 gap-4">

      {links.map(row => (
        <div className="flex flex-row gap-2 cursor-pointer">
        <row.icon size={24} className="text-white" />
        <NavLink to={row.to}>
          <h3 className="text-white font-semibold  hover:underline">{row.name}</h3>
        </NavLink>
      </div>
      ))

      }

    </div>
  </div>
  
    <div className="absolute md:hidden right-5 top-1 z-10 cursor-pointer text-white">

      {isSideBarOpen ? 
      
      <RiCloseLine size={32} onClick={handleMenuClick} />
      
      :<HiOutlineMenu size={32} onClick={handleMenuClick} />
      }
    </div>

  <div className={`absolute md:hidden w-2/3 bg-gradient-to-tl z-10 min-h-screen flex items-center flex-col gap-2 backdrop-blur-sm
   from-white/80 to-[#201b2df5] smooth-transition ${isSideBarOpen ? 'left-0' : '-left-full'}`}>
    
    <img src={logo} className="w-1/3" /> 

    <div className="flex flex-col items-start justify-start mt-4 w-full p-2 gap-4">

      {links.map(row => (
        <div className="flex flex-row gap-2 cursor-pointer">
        <row.icon size={24} className="text-white" />
        <NavLink to={row.to}>
          <h3 className="text-white font-semibold  hover:underline">{row.name}</h3>
        </NavLink>
      </div>
      ))

      }

    </div>
  </div>
  
  </>);
}
export default Sidebar;
