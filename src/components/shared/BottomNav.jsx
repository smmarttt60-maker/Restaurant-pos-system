import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdReorder } from "react-icons/io";
import { MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi"

// NavLink tells us if its page is the current one (isActive),
// so the highlighted button follows the page instead of always being "Home".
const navLinkClass = ({ isActive }) =>
    `flex flex-col md:flex-row items-center justify-center flex-1 md:flex-initial md:w-[200px] ${
        isActive ? "text-[#f5f5f5] bg-[#343434] rounded-[20px]" : "text-[#ababab]"
    }`;

const BottomNav = () => {
    return (
        <div className='fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around'>

            <NavLink to="/" end className={navLinkClass}><FaHome className="inline md:mr-2" size={20} /> <p className="text-xs md:text-base">Home</p></NavLink>
            <NavLink to="/orders" className={(state) => `${navLinkClass(state)} mr-6 md:mr-0`}><IoMdReorder className="inline md:mr-2" size={20} /> <p className="text-xs md:text-base">Orders</p> </NavLink>
            {/* Tables and More have no pages yet, so they stay plain buttons */}
            <button className='flex flex-col md:flex-row items-center justify-center text-[#ababab] flex-1 md:flex-initial md:w-[200px] ml-6 md:ml-0'><MdTableBar className="inline md:mr-2" size={20} /><p className="text-xs md:text-base">Tables</p></button>
            <button className='flex flex-col md:flex-row items-center justify-center text-[#ababab] flex-1 md:flex-initial md:w-[200px]'><CiCircleMore className="inline md:mr-2" size={20} /><p className="text-xs md:text-base">More</p></button>

            <NavLink to="/menu" aria-label="Menu" className='absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 md:p-3 items-center'><BiSolidDish /></NavLink>
        </div>
    )
}

export default BottomNav
