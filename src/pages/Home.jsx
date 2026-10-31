import Greetings from "../components/home/Greetings";
import MiniCard from "../components/home/MiniCard";
import {BsCashCoin} from "react-icons/bs";
import {GrInProgress} from "react-icons/gr";
import RecentOrders from '../components/home/RecentOrders';
import PopularDishes from '../components/home/PopularDishes';



const Home = () => {
  return (
    <section className="bg-[#1f1f1f] flex flex-col md:flex-row gap-3 pb-24 md:pb-0 md:h-[calc(100vh-5rem)] md:overflow-hidden">
      {/* Left Div */}
      <div className='md:flex-[3] bg-[#1f1f1f]'>
        <Greetings/>
        <div className='flex items-center w-full gap-3 px-4 md:px-8 mt-5 md:mt-8'>
          <MiniCard title="Total Earnings" icon={<BsCashCoin/>} number={512}
          footerNum={1.6} />
          <MiniCard title="In Progress" icon={<GrInProgress/>} number={16}
          footerNum={3.6} />
        </div>
        <RecentOrders/>
      </div>
      {/* Right Div  */}
      <div className='md:flex-[2] '>
        <PopularDishes/>

      </div>
    </section>
  )
}

export default Home
