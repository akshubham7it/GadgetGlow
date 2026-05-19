import { useState, useEffect } from "react";

export default function Timer() {
  const duration = 12 * 24 * 60 * 60 * 1000;
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const getTimeParts = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    return [days, hours, minutes, seconds];
  };

  const [days, hours, minutes, seconds] = getTimeParts(time);

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-10">
      <div className="bg-[#D8EEF7] rounded-3xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-8 md:p-12">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-center">
            <p className="text-[#4B5CFF] text-lg font-medium mb-4">
              Don't Miss!!
            </p>

            <h1 className="text-[#162044] text-4xl md:text-5xl font-bold leading-tight mb-5">
              Enhance Your Music Experience
            </h1>

            <p className="text-[#5B647C] text-base mb-8">
              True Wireless Noise Cancelling Headphone
            </p>

            {/* TIMER */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Minutes", value: minutes },
                { label: "Seconds", value: seconds },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-[72px] h-[72px] bg-white rounded-xl shadow-md flex items-center justify-center text-[#162044] text-3xl font-bold">
                    {String(item.value).padStart(2, "0")}
                  </div>

                  <p className="mt-2 text-sm text-[#162044]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <button className="w-fit px-7 py-3 rounded-xl bg-[#3C50E0] text-white font-medium hover:bg-[#2436b8] transition-all duration-300">
              Check it Out!
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-[520px] h-[320px] md:h-[380px] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80"
                alt="Headphones"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}