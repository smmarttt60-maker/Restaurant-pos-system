import {useState,useEffect} from 'react';

const Greetings = () => {
const [datetime, setDateTime]= useState(new Date());
useEffect(() =>{
const timer = setInterval(() => setDateTime(new Date()),1000 );
return () => clearInterval(timer);
},[]);

const formatDate = (date) => {
const months = [
  'January','February','March','April','May','June','July','August',
  'September','October','November','December'
];
return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')},
${date.getFullYear()} `;
};
const formatTime = (date) =>
  `${String(date.getHours()).padStart(2,"0")}:${String(
  date.getMinutes()
).padStart(2,"0")}:${String(date.getSeconds()).padStart(2,"0")}`;


  return (
    <div className='flex justify-between items-center gap-3 md:gap-0 px-4 md:px-8 mt-5'>
        <div>
            <h1 className='text-[#f5f5f5] text-2xl font-semibold tracking-wide'>Good morning,Sami</h1>
            <p className='text-[#ababab] text-sm'>give your best services to your customers😀  </p>
            
        </div>
        <div className=''>
          <h1 className='text-[#f5f5f5] text-2xl font-bold tracking-wide md:w-[130px]'>{formatTime(datetime)}</h1>
          <p className='text-[#ababab] text-sm'>{formatDate(datetime)}</p>
        </div>
    </div>
  )
}

export default Greetings