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

// Online image URLs
const IMAGES = {
  appleWatch:
    "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/a912074ca713548b38911dd96cd0c7e4c72ffa8b.jpg",
  macbook:
    "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/8ac0a5ff59ecdc33f7851267d797ab17295a2ff7.jpg",
  headphone:
    "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/ea31578e50adc73669a3f90c681cd3bbbbc7dede.jpg",
  // MacBook Pro on wooden table (side card)
  mac1: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/923c57c4b4005e3f3ccb97ebebc8a48c0f0ec19d.jpg",
  // iPhone 17 rose gold (side card)
  iphone:
    "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/7a536941633600abbcbe5cc72f9c500642a21eb5.jpg",
};

const slides = [
  {
    img: IMAGES.appleWatch,
    alt: "Apple Watch Ultra",
    title: "Apple Watch Ultra",
    description:
      "Built for extreme adventures — dual-frequency GPS, up to 60 hours of battery life, and a titanium case rated to 100m depth.",
    link: "detail/9",
  },
  {
    img: IMAGES.macbook,
    alt: "Macbook Pro M4 Pro-512",
    title: "Macbook Pro M4 Pro-512",
    description:
      "Powered by the Apple M4 Pro chip with a 12-core CPU, delivering pro-level performance and up to 24 hours of battery life.",
    link: "detail/10",
  },
  {
    img: IMAGES.headphone,
    alt: "True Wireless Noise Cancelling Headphone",
    title: "True Wireless Noise Cancelling Headphone",
    description:
      "Industry-leading active noise cancellation with 30-hour battery, adaptive transparency mode, and premium spatial audio.",
    link: "detail/11",
  },
];

export default function Home() {
  return (
    <>
      <div className="bg-[#E5EAF4] shadow-sm min-h-screen">
        <div className="max-w-[1170px] mx-auto py-12 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-stretch gap-5">

            {/* ── Hero Swiper ── */}
            <div className="w-full lg:w-[65%]">
              <Swiper
                className="rounded-3xl h-full"
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: true }}
                modules={[Autoplay]}
              >
                {slides.map((slide, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid md:grid-cols-2 bg-white rounded-3xl py-8 px-6 h-full overflow-hidden">

                      {/* Mobile: image on top */}
                      <div className="md:hidden mb-6 flex justify-center">
                        <img
                          className="h-[200px] object-contain"
                          src={slide.img}
                          alt={slide.alt}
                          loading="lazy"
                        />
                      </div>

                      {/* Desktop: text column */}
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
                            {slide.title}
                          </p>
                          <p className="text-sm text-gray-700 px-2">
                            {slide.description}
                          </p>
                          <Link to={slide.link}>
                            <button className="bg-[#1C274C] text-white mt-3 px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                              Shop Now
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Desktop: image column */}
                      <div className="hidden md:flex justify-center items-center">
                        <img
                          className="max-h-[340px] object-contain"
                          src={slide.img}
                          alt={slide.alt}
                          loading="lazy"
                        />
                      </div>

                      {/* Mobile: text below image */}
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
                            {slide.title}
                          </p>
                          <p className="text-sm text-gray-700">
                            {slide.description}
                          </p>
                          <Link to={slide.link}>
                            <button className="bg-[#1C274C] text-white px-4 py-2 rounded-lg hover:bg-violet-900 w-32">
                              Shop Now
                            </button>
                          </Link>
                        </div>
                      </div>

                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ── Side product cards ── */}
            <div className="w-full flex flex-col justify-between gap-5">

              {/* MacBook Pro card */}
              <Link to={"detail/7"}>
                <div className="bg-white rounded-3xl flex flex-col sm:flex-col lg:flex-row items-center lg:items-center px-5 py-9">
                  <img
                    className="w-full sm:block md:w-[350px] lg:hidden object-contain mb-4"
                    src={IMAGES.mac1}
                    alt="Macbook Pro on wooden table"
                    loading="lazy"
                  />
                  <div className="flex flex-col justify-between gap-4 w-full">
                    <p className="text-[#1C274C] font-semibold text-lg text-left">
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
                    className="hidden lg:block sm:w-[20px] md:w-[120px] lg:w-[150px] object-contain"
                    src={IMAGES.mac1}
                    alt="Macbook Pro on wooden table"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* iPhone 17 card */}
              <Link to={"detail/9"}>
                <div className="bg-white rounded-3xl flex flex-col sm:flex-col lg:flex-row items-center lg:items-center px-5 py-8">
                  <img
                    className="w-full sm:block md:w-[350px] lg:hidden object-contain mb-4"
                    src={IMAGES.iphone}
                    alt="iPhone 17"
                    loading="lazy"
                  />
                  <div className="flex flex-col justify-between gap-4 w-full">
                    <p className="text-[#1C274C] font-semibold text-lg text-left">
                      iPhone 17 - 8/128GB
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
                    className="hidden lg:block sm:w-[10px] md:w-[100px] lg:w-[150px] object-contain"
                    src={IMAGES.iphone}
                    alt="iPhone 17"
                    loading="lazy"
                  />
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* ── Feature badges ── */}
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
              <div className="flex gap-3 items-start max-w-xs" key={idx}>
                <img src={item.icon} alt={item.title} className="w-6 h-6" />
                <div>
                  <p className="text-[#1C274C] font-medium text-lg">
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