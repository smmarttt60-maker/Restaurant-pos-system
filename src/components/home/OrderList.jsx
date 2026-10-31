import { FaCheckDouble } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'

const OrderList = () => {
  return (
    <div className='flex items-center gap-3 md:gap-5 mb-3'>
      <button className='bg-[#f6b100] p-3 text-xl font-bold rounded-lg shrink-0 md:shrink'>AM</button>
      <div className='flex flex-wrap md:flex-nowrap items-center justify-between gap-x-3 gap-y-2 md:gap-0 w-[100%]'>
        <div className='flex flex-col items-start gap-1'>
          <h1 className='text-[#f5f5f5] text-lg font-semibold tracking-wide'>SamiUllah</h1>
          <p className='text-[#ababab] text-sm'>8 Items</p>
        </div>
        <div>
          <h1 className='text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1 whitespace-nowrap md:whitespace-normal'>Table No: 3</h1>
        </div>
        <div className='flex flex-col items-start gap-2'>
          <p className='text-green-600 md:px-4'><FaCheckDouble className='inline mr-2' /> Ready</p>
          <p className='text-[#ababab] text-sm'><FaCircle className="inline mr-2 text-green-600" /> Ready to serve</p>
        </div>
      </div>
    </div>
  )
}

export default OrderList