import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Browse() {
  const sliderRef = useRef(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const review = [
    {
      rating: 3,
      name: "David Dorwart",
      image: "./user2.jpg",
      position: "Serial Entrepreneur",
      review:
        "Lorem ipsum dolor sit amet, adipiscing elit. Donec malesuada justo vitaeaugue suscipit beautiful vehicula",
    },
    {
      rating: 5,
      name: "Wilson Dias",
      image: "./user1.jpg",
      position: "Backend Developer",
      review:
        "Lorem ipsum dolor sit amet, adipiscing elit. Donec malesuada justo vitaeaugue suscipit beautiful vehicula",
    },
    {
      rating: 3.5,
      name: "David Dorwart",
      image: "./user2.jpg",
      position: "Serial Entrepreneur",
      review:
        "Lorem ipsum dolor sit amet, adipiscing elit. Donec malesuada justo vitaeaugue suscipit beautiful vehicula",
    },
    {
      rating: 8,
      name: "Wilson Dias",
      image: "./user1.jpg",
      position: "Backend Developer",
      review:
        "Lorem ipsum dolor sit amet, adipiscing elit. Donec malesuada justo vitaeaugue suscipit beautiful vehicula",
    },
  ];

  const showRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full ${i}`} size={16} fill="yellow" stroke="yellow" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4 overflow-hidden">
          <Star size={16} fill="gray" stroke="gray" className="absolute " />
          <div className="absolute  w-[50%] h-full overflow-hidden">
            <Star size={16} fill="yellow" stroke="yellow" />
          </div>
        </div>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <Star
          key={`empty  ${stars.length}`}
          size={16}
          fill="gray"
          stroke="gray"
        />
      );
    }

    return stars.slice(0,5);
  };

  return (
    <div>
      <div className="max-w-[1170px] mx-auto mt-28">
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          <h2 className="text-2xl text-violet-950 font-semibold py-2 px-2">
            User Feedbacks
          </h2>
          <div className="flex justify-end items-center gap-2 text-xs px-2">
            <button
              className="hover:bg-[#3C50E0] p-1 rounded-md border  hover:border-[#3C50E0]"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className="hover:bg-[#3C50E0] p-1 rounded-md border  hover:border-[#3C50E0]"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="px-2">
          <Slider ref={sliderRef} {...settings} className="gap-6">
            {review.map((item, idx) => (
              <div key={idx} className="px-2">
                <div className="bg-white rounded-2xl shadow-sm border p-6 h-auto flex flex-col mb-8">
                  <div className="flex justify-start space-x-1 mb-3">
                    {showRating(item.rating)}
                  </div>
                  <p className="text-[#1C274C] text-sm mb-8">{item.review}</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-[#1C274C] font-semibold text-sm">
                        {item.name}
                      </p>
                      <p className="text-[#606882] text-sm">{item.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
