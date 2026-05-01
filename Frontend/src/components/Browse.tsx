import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import { useRef } from "react";
import { useNavigate } from "react-router";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Browse() {
  const sliderRef = useRef<any>(null);
  const navigate = useNavigate();

  // SAME filtering logic as Header
  const handleCategoryClick = (category: string) => {
    navigate(`/explore?category=${encodeURIComponent(category)}`);
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const categories = [
    { name: "Laptop & PC", image: "./mac1.jpg" },
    { name: "Watches", image: "./watch.jpg" },
    { name: "Mobile & Tablets", image: "./iphone.jpg" },
    { name: "Health & Sports", image: "./tm.jpg" },
    { name: "Home Appliances", image: "./grinder.jpg" },
    { name: "Games & Videos", image: "./controller.jpg" },
    { name: "Televisions", image: "./tvgreen.jpg" },
  ];

  return (
    <div>
      <div className="max-w-[1170px] mx-auto mt-28">
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          <h2 className="text-2xl text-violet-950 font-semibold py-2 px-2">
            Browse by Category
          </h2>

          <div className="flex justify-end items-center gap-2 text-xs px-2">
            <button
              className="hover:bg-[#3C50E0] p-1 rounded-md border hover:border-[#3C50E0]"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="hover:bg-[#3C50E0] p-1 rounded-md border hover:border-[#3C50E0]"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="slider-container px-2">
          <Slider ref={sliderRef} {...settings}>
            {categories.map((item, idx) => (
              <div key={idx} className="flex justify-center py-5">
                <div
                  onClick={() => handleCategoryClick(item.name)}
                  className="flex flex-col items-center pt-2 cursor-pointer"
                >
                  <div className="bg-pink-100 rounded-full flex justify-center mb-2 w-32 h-28 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-blue-800 hover:text-violet-900 hover:underline text-center">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}