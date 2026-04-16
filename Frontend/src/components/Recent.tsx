import { ChevronLeft, ChevronRight, Mail } from "lucide-react";

export default function Recent() {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10 mt-10">
      <div className="text-md text-blue-900 font-semibold">Recent</div>
      <div className="flex items-center justify-between text-xl font-bold">
        <span className="text-blue-900">Recently Viewed Products</span>
        <span className="flex space-x-2">
          <button className="hover:bg-[#3C50E0] p-1 rounded-md border  hover:border-[#3C50E0]"><ChevronLeft size={24} /></button>
          <button className="hover:bg-[#3C50E0] p-1 rounded-md border  hover:border-[#3C50E0]"><ChevronRight size={24} /></button>
        </span>
      </div>
      <div className="relative rounded-xl overflow-hidden max-w-[1170px] mx-auto mt-12 ">
        <img src="/bg.jpg" alt="Background" className="w-full h-72 object-cover sm:h-60 md:h-60  lg:h-44 " />
        <div className="md:text-sm absolute inset-0   flex flex-col md:flex-row items-center justify-between px-6 md:px-8 py-6 text-white space-y-6 md:space-y-0">
          <div className="text-center md:text-left md:mr-10 ">
            <h2 className="text-1xl font-extrabold  md:text-xl">
              Don't Miss Out Latest <br /> Trends & Offers
            </h2>
            <p className="text-xs md:text-xs mt-2">
              Register to receive news about the latest offers & discount codes
            </p>
          </div>
          <div className="flex w-full md:w-auto items-center flex-col sm:flex-row gap-3 sm:gap-2">
            <div className="relative w-full sm:w-[329px] h-[50px] mt-1">
              <Mail className="absolute left-3 top-6 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email"
                className="text-black pl-10 pr-4 py-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#3C50E0]"
              />
            </div>
            <button className="bg-[#3C50E0] hover:bg-violet-800 px-5 py-1 rounded-md text-base w-full sm:w-[130px] h-[48px]">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
