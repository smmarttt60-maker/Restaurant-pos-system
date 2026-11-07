import { popularDishes } from "../../constants";

const PopularDishes = () => {
  return (
    <div className="mt-2 md:mt-6 px-4 md:px-0 md:pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg">
        <div className="flex justify-between items-center px-4 md:px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Popular Dishes
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold p-3 -m-3 md:p-0 md:m-0">
            View all
          </a>
        </div>

        <div className="pb-4 md:pb-0 md:overflow-y-scroll md:h-[680px] scrollbar-hide">
          {
            popularDishes.map((dish) => {
return (
                <div key={dish.id} className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-4 md:px-6 py-4 mt-4 mx-4 md:mx-6">
                    <h1 className="text-[#f5f5f5] font-bold text-xl mr-4">{dish.id < 10 ? `0${dish.id}`:dish.id}</h1>
                  <img src={dish.image} alt={dish.name} className="w-[50px] h-[50px] rounded-full shrink-0 md:shrink" />
                  <div>
                    <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{dish.name}</h1>
                    <p className="text-[#f5f5f5] text-sm font-semibold mt-1"><span className="text-[#ababab]">Orders:</span> {dish.numberOfOrders} </p>
                  </div>
                </div>
              )
            })
          }
        </div>

      </div>
    </div>
  );
};

export default PopularDishes;