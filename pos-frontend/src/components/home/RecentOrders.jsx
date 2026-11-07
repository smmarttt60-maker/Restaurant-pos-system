import {FaSearch}from "react-icons/fa";
import OrderList from "./OrderList"


const RecentOrders = () => {
  return (
    <div className='px-4 md:px-8 mt-6'>
      <div className='bg-[#1a1a1a] w-full h-[450px] rounded-lg'>
        <div className='flex justify-between items-center px-4 md:px-6 py-4'>
          <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>Recent Orders</h1>
          <a href="" className='text-[#025cca] text-sm font-semibold p-3 -m-3 md:p-0 md:m-0'>View all</a>
        </div>

        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-4 md:px-6 py-4 mx-4 md:mx-6">
          <FaSearch className="text-[#f5f5f5] shrink-0" />
          <input
            type="text"
            placeholder="Search recent Orders"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full min-w-0 md:w-auto md:min-w-[auto]"
          />
        </div>
        {/* Order list */}
       <div className='mt-4 px-4 md:px-6 overflow-y-scroll h-[300px] scrollbar-hide '>
         <OrderList/>
         <OrderList/>
         <OrderList/>
         <OrderList/>
         <OrderList/>
         <OrderList/>



       </div>
      </div>
    </div>
  )
}


export default RecentOrders