import Recent from "./Recent";
import Lower from "./Lower";
import Timer from "./Timer";
import Browse from "./Browse";
import Explore from "../Explore";
import Feedback from "./Feedback";


import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Home() {

   
  return (
    <>
      <div className="bg-[#E5EAF4] shadow-sm min-h-screen">
        <div className="max-w-[1170px] mx-auto py-12 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-5">
            <div className="w-full lg:w-[65%]">
              <Swiper
                className="rounded-3xl h-full"
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                modules={[Autoplay]}
              >
                <SwiperSlide>
                  <div className="grid md:grid-cols-2 bg-white rounded-3xl py-8 px-6 h-full overflow-hidden">
                    <div className=" md:hidden mb-6 flex justify-center">
                      <img
                        className="h-[200px] object-contain"
                        src="./orangewatch.jpg"
                        alt="Apple Watch"
                      />
                    </div>
                    <div className="hidden md:flex flex-col justify-center pl-4 pr-2">
                      <div className="flex space-x-2 mb-10">
                        <h1 className="text-[#3C50E0] text-4xl md:text-[60px] font-bold mt-2">
                          30%
                        </h1>
                        <div className="flex flex-col text-[#1C274C] text-lg">
                          <p>Sale</p>
                          <p>Off</p>
                        </div>
                      </div>
                      <div className="space-y-12">
                        <p className="text-[#1C274C] font-semibold text-2xl md:text-4xl">
                          Apple Watch Ultra
                        </p>
                        <p className="text-sm text-gray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                          Shop Now
                        </button>
                      </div>
                    </div>
                    <div className="hidden md:flex justify-center items-center">
                      <img
                        className="max-h-[340px] object-contain"
                        src="./orangewatch.jpg"
                        alt="Apple Watch"
                      />
                    </div>
                    <div className="block md:hidden">
                      <div className="text-left space-y-4">
                        <div className="flex space-x-2 mb-4">
                          <h1 className="text-[#3C50E0] text-4xl font-bold mt-2">
                            30%
                          </h1>
                          <div className="flex flex-col text-[#1C274C] text-lg">
                            <p>Sale</p>
                            <p>Off</p>
                          </div>
                        </div>
                        <p className="text-[#1C274C] font-semibold text-2xl">
                          Apple Watch Ultra
                        </p>
                        <p className="text-sm text-gray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                          <Link to={"detail/9"}>Shop Now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="grid md:grid-cols-2 bg-white rounded-3xl py-8 px-6 h-full overflow-hidden">
                    <div className=" md:hidden mb-6 flex justify-center">
                      <img
                        className="h-[200px] object-contain"
                        src="./mac.jpg"
                        alt="Macbook"
                      />
                    </div>
                    <div className="hidden md:flex flex-col justify-center pl-4 pr-2">
                      <div className="flex space-x-2 mb-10">
                        <h1 className="text-[#3C50E0] text-4xl md:text-[60px] font-bold mt-2">
                          30%
                        </h1>
                        <div className="flex flex-col text-[#1C274C] text-lg">
                          <p>Sale</p>
                          <p>Off</p>
                        </div>
                      </div>
                      <div className="space-y-12">
                        <p className="text-[#1C274C] font-semibold text-2xl md:text-4xl">
                          Macbook Pro MP4 Pro-512
                        </p>
                        <p className="text-sm text-gray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                          Shop Now
                        </button>
                      </div>
                    </div>
                    <div className="hidden md:flex justify-center items-center">
                      <img
                        className="max-h-[357px] object-contain"
                        src="./mac.jpg"
                        alt="Macbook"
                      />
                    </div>
                    <div className="block md:hidden">
                      <div className="text-left space-y-4">
                        <div className="flex space-x-2 mb-4">
                          <h1 className="text-[#3C50E0] text-4xl font-bold mt-2">
                            30%
                          </h1>
                          <div className="flex flex-col text-[#1C274C] text-lg">
                            <p>Sale</p>
                            <p>Off</p>
                          </div>
                        </div>
                        <p className="text-[#1C274C] font-semibold text-2xl">
                          Macbook Pro MP4 Pro-512
                        </p>
                        <p className="text-sm text-gray-700">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                        <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                          <Link to={"detail/9"}>Shop Now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <div className="w-full lg:w-[65%]">
                  <Swiper
                    className="rounded-3xl h-full"
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: true,
                    }}
                    modules={[Autoplay]}
                  >
                    <SwiperSlide>
                      <div className="grid md:grid-cols-2 bg-white rounded-3xl py-8 px-6 h-[500px] overflow-hidden">
                        <div className="md:hidden mb-6 flex justify-center">
                          <img
                            className="h-40 object-contain"
                            src="./orangewatch.jpg"
                            alt="Apple Watch"
                          />
                        </div>
                        <div className="hidden md:flex flex-col justify-center pl-4 pr-2">
                          <div className="flex space-x-2 mb-10">
                            <h1 className="text-[#3C50E0] text-4xl md:text-[60px] font-bold mt-2">
                              30%
                            </h1>
                            <div className="flex flex-col text-[#1C274C] text-lg">
                              <p>Sale</p>
                              <p>Off</p>
                            </div>
                          </div>
                          <div className="space-y-12">
                            <p className="text-[#1C274C] font-semibold text-2xl md:text-4xl">
                              Apple Watch Ultra
                            </p>
                            <p className="text-sm text-gray-700">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                              Shop Now
                            </button>
                          </div>
                        </div>
                        <div className="hidden md:flex justify-center items-center">
                          <img
                            className="max-h-[320px] object-contain"
                            src="./orangewatch.jpg"
                            alt="Apple Watch"
                          />
                        </div>
                        <div className="block md:hidden">
                          <div className="text-left space-y-4">
                            <div className="flex space-x-2 mb-4">
                              <h1 className="text-[#3C50E0] text-4xl font-bold mt-2">
                                30%
                              </h1>
                              <div className="flex flex-col text-[#1C274C] text-lg">
                                <p>Sale</p>
                                <p>Off</p>
                              </div>
                            </div>
                            <p className="text-[#1C274C] font-semibold text-2xl">
                              Apple Watch Ultra
                            </p>
                            <p className="text-sm text-gray-700">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <Link to={"detail/9"}>
                              <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                                Shop Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="grid md:grid-cols-2 bg-white rounded-3xl py-8 px-6 h-[500px] overflow-hidden">
                        <div className="md:hidden mb-6 flex justify-center">
                          <img
                            className="h-40 object-contain"
                            src="./mac.jpg"
                            alt="Macbook"
                          />
                        </div>
                        <div className="hidden md:flex flex-col justify-center pl-4 pr-2">
                          <div className="flex space-x-2 mb-10">
                            <h1 className="text-[#3C50E0] text-4xl md:text-[60px] font-bold mt-2">
                              30%
                            </h1>
                            <div className="flex flex-col text-[#1C274C] text-lg">
                              <p>Sale</p>
                              <p>Off</p>
                            </div>
                          </div>
                          <div className="space-y-12">
                            <p className="text-[#1C274C] font-semibold text-2xl md:text-4xl">
                              Macbook Pro MP4 Pro-512
                            </p>
                            <p className="text-sm text-gray-700">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <Link to={"detail/9"}>
                              <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                                Shop Now
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="hidden md:flex justify-center items-center">
                          <img
                            className="max-h-[320px] object-contain"
                            src="./mac.jpg"
                            alt="Macbook"
                          />
                        </div>
                        <div className="block md:hidden">
                          <div className="text-left space-y-4">
                            <div className="flex space-x-2 mb-4">
                              <h1 className="text-[#3C50E0] text-4xl font-bold mt-2">
                                30%
                              </h1>
                              <div className="flex flex-col text-[#1C274C] text-lg">
                                <p>Sale</p>
                                <p>Off</p>
                              </div>
                            </div>
                            <p className="text-[#1C274C] font-semibold text-2xl">
                              Macbook Pro MP4 Pro-512
                            </p>
                            <p className="text-sm text-gray-700">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <Link to={"detail/9"}>
                              <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                                Shop Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="grid md:grid-cols-2 bg-white rounded-3xl py-8 px-6 h-[500px] overflow-hidden">
                        <div className="md:hidden mb-6 flex justify-center">
                          <img
                            className="h-32 sm:h-36 object-contain"
                            src="./blhp.jpg"
                            alt="Headphone"
                          />
                        </div>
                        <div className="hidden md:flex flex-col justify-center pl-4 pr-2">
                          <div className="flex space-x-2 mb-10">
                            <h1 className="text-[#3C50E0] text-4xl md:text-[60px] font-bold mt-2">
                              30%
                            </h1>
                            <div className="flex flex-col text-[#1C274C] text-lg">
                              <p>Sale</p>
                              <p>Off</p>
                            </div>
                          </div>
                          <div className="space-y-12">
                            <p className="text-[#1C274C] font-semibold text-2xl md:text-4xl">
                              True Wireless Noise Cancelling Headphone
                            </p>
                            <p className="text-sm text-gray-700">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p> 
                            <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                              Shop Now
                            </button>
                          </div>
                        </div>
                        <div className="hidden md:flex justify-center items-center">
                          <img
                            className="md:h-[200px] max-h-[300px]"
                            src="./blhp.jpg"
                            alt="Headphone"
                          />
                        </div>
                        <div className="block md:hidden">
                          <div className="text-left space-y-4">
                            <div className="flex space-x-2 mb-4">
                              <h1 className="text-[#3C50E0] text-4xl font-bold mt-2">
                                30%
                              </h1>
                              <div className="flex flex-col text-[#1C274C] text-lg">
                                <p>Sale</p>
                                <p>Off</p>
                              </div>
                            </div>
                            <p className="text-[#1C274C] font-semibold text-2xl">
                              True Wireless Noise Cancelling Headphone
                            </p>
                            <p className="text-sm text-gray-700">
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit.
                            </p>
                            <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                              Shop Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </Swiper> 
            </div>  

            <div className="w-full  flex flex-col justify-between gap-5">
              <Link to={"detail/7"}>
                <div className="bg-white rounded-3xl  flex flex-col sm:flex-col lg:flex-row items-center lg:items-center px-5 py-9">
                  <img
                    className="w-full sm:block md:w-[350px] lg:hidden object-contain mb-4"
                    src="./mac1.jpg"
                    alt="Macbook"
                  />
                  <div className="flex flex-col justify-between gap-4 w-full ">
                    <p className="text-[#1C274C] font-semibold text-lg  text-left">
                      Macbook Pro - 512/16GB
                    </p>
                    <div className="text-left">
                      <p className="text-gray-700 text-sm mb-1 mt-10">
                        limited time offer
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="text-[#F23030] text-2xl font-semibold">
                          $450
                        </p>
                        <p className="text-gray-700 text-xl line-through">
                          $500
                        </p>
                      </div>
                    </div>
                  </div>
                  <img
                    className="hidden lg:block sm:w-[20px] md:w-[120px] lg:w-[190px] object-contain"
                    src="./mac1.jpg"
                    alt="Macbook"
                  />
                </div>
              </Link>

              <Link to={"detail/9"}>
                <div className="bg-white rounded-3xl  flex flex-col sm:flex-col lg:flex-row items-center lg:items-center px-5 py-8">
                  <img
                    className="w-full sm:block md:w-[350px] lg:hidden object-contain mb-"
                    src="./iphone.jpg"
                    alt="iPhone"
                  />
                  <div className="flex flex-col justify-between gap-4 w-full ">
                    <p className="text-[#1C274C] font-semibold text-lg  text-left">
                      iPhone 16 Pro - 8/128GB
                    </p>
                    <div className="text-left">
                      <p className="text-gray-700 text-sm mb-1 mt-10">
                        limited time offer
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="text-[#F23030] text-2xl font-semibold">
                          $600
                        </p>
                        <p className="text-gray-700 text-xl line-through">
                          $899
                        </p>
                      </div>
                    </div>
                  </div>
                  <img
                    className="hidden lg:block sm:w-[20px] md:w-[120px] lg:w-[190px] object-contain"
                    src="./iphone.jpg"
                    alt="iPhone"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1170px] mx-auto py-6 px-4">
          <div className="flex flex-wrap justify-center gap-6 text-lg">
            {[
              {
                icon: "./truck.svg",
                title: "Free Shipping",
                subtitle: "For all orders $200",
              },
              {
                icon: "./refresh.svg",
                title: "1&1 Returns",
                subtitle: "Cancellation after 1 day",
              },
              {
                icon: "./verify.svg",
                title: "100% secure Payments",
                subtitle: "Guarantee secure payments",
              },
              {
                icon: "./message.svg",
                title: "24/7 Dedicated Support",
                subtitle: "Anywhere & anytime",
              },
            ].map((item, idx) => (
              <div className="flex gap-3 items-start max-w-xs " key={idx}>
                <img src={item.icon} alt={item.title} className="w-6 h-6 " />
                <div>
                  <p className="text-[#1C274C] font-medium text-lg text-dark">
                    {item.title}
                  </p>
                  <p className="text-base text-gray-700 mb-12">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Browse />
      <Explore />

      <Lower />
      <Timer />
      <Feedback />
      <Recent />
    </>
  );
}
