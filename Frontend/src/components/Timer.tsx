import { useState, useEffect } from "react";

export default function Timer() {
  const duration = 12 * 24 * 60 * 60 * 1000;
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setTimeout(() => {
      setTime(time - 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  const getTimeParts = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    const seconds = totalSeconds % 60;
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;
    return [days, hours, minutes, seconds];
  };

  const [days, hours, minutes, seconds] = getTimeParts(time);

  return (
    <>
      <div className="max-w-[1170px] mx-auto lg:px-4 sm:px-8  ">
        <div className="mt-5 w-full bg-[#D0E9F3] h-auto sm:h- lg:h-[580px] xl:h-[520px] rounded-2xl md:p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-6">
            <div className="lg:col-span-7 flex items-center justify-center sm:justify-center lg:justify-end pr-0 sm:pr-0 lg:pr-[130px] order-1 lg:order-2">
              <img className="max-w-full h-auto" src="./blahp.jpg" alt="" />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4 sm:pl-4 lg:pl-[60px] justify-start pt-[20px] sm:pt-[30px] lg:pt-[40px] order-2 lg:order-1">
              <p className="text-[#3C50E0] text-[20px] sm:text-[22px]">
                Don't Miss!!
              </p>
              <p className="text-[#1C274C] text-[26px] sm:text-[30px] lg:text-[40px] font-bold ">
                Enhance Your Music Experience
              </p>
              <p className="text-[#606882] text-sm sm:text-base">
                True Wireless Noise Cancelling Headphone
              </p>

              <div className="mt-3 flex flex-wrap gap-5 text-[#1C274C]">
                {[
                  { label: "Days", value: days },
                  { label: "Hours", value: hours },
                  { label: "Minutes", value: minutes },
                  { label: "Seconds", value: seconds },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-1.5 items-center">
                    <div className="w-[55px] sm:w-[60px] h-[55px] sm:h-[60px] font-semibold text-2xl sm:text-3xl text-dark rounded-lg flex items-center justify-center bg-white shadow-md px-3 sm:px-4 mb-2">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <p className="text-[13px] sm:text-[14px]">{item.label}</p>
                  </div>
                ))}
              </div>

              <button className="mt-4 py-1.5 px-1.5 w-28 h-10 sm:w-32 hover:bg-blue-950 rounded-lg bg-[#3C50E0] text-white mb-">
                Check it Out!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
