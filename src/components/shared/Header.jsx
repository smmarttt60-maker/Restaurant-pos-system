import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

const Header = () => {
  return (
    <header className="flex flex-wrap md:flex-nowrap justify-between items-center gap-y-3 py-3 px-4 md:py-4 md:px-8 bg-[#1A1A1A]">
      {/* LOGO */}
      <div className="flex items-center gap-2 shrink-0">
        <img src={logo} className='h-8 w-8' alt="restro logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5]">Restro</h1>
      </div>
      {/* SEARCH */}
      <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-3 md:py-2 w-full order-last md:order-none md:w-[500px]">
        <FaSearch className='text-[#f5f5f5] shrink-0' />

        <input
          type="text"
          placeholder="Search"
          className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full min-w-0"
        />
      </div>

      {/* LOGGED USER DETAILS */}
      <div className="flex items-center gap-2 md:gap-4" >
      
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl " />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle  className="text-[#f5f5f5] text-4xl"/>
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold">SamiUllah</h1>
            <p className="text-xs text-[#ababab] font-medium">Admin</p>
          </div>
        
       </div>
      </div>

    </header>
  )
}

export default Header;