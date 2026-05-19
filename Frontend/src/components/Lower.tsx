export default function Lower() {
  return (
    <>
      <div className="px-4 xl:px-20 mt-28">
        
        {/* TOP BANNER */}
        <div className="bg-[#edf5f5] max-w-[1170px] mx-auto rounded-2xl flex flex-col-reverse xl:flex-row justify-between items-center xl:px-24 px-6 gap-5 overflow-hidden">
          
          <div className="flex flex-col py-8 xl:py-12 gap-4 text-left max-w-[550px]">
            <p className="text-[#1C274C] text-lg font-semibold">
              Apple iPhone 14 Plus
            </p>

            <p className="font-bold text-3xl xl:text-5xl text-[#1C274C]">
              UP TO 30% OFF
            </p>

            <div className="text-gray-500 flex flex-col gap-1 text-sm sm:text-base">
              <p>
                iPhone 14 has the same superspeedy chip that's in iPhone 13
                Pro,
              </p>
              <p>
                A15 Bionic, with a 5-core GPU, powers all the latest features.
              </p>
            </div>

            <button className="mt-4 bg-[#3C50E0] text-white rounded-lg hover:bg-violet-800 py-2 px-6 w-fit transition-all duration-300">
              Buy Now
            </button>
          </div>

          <div className="flex justify-center items-center py-6">
            <img
              className="w-[220px] xl:w-[260px] object-contain"
              src="https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=1200&q=80"
              alt="iPhone"
            />
          </div>
        </div>

        {/* LOWER GRID */}
        <div className="max-w-[1170px] mx-auto py-5 mb-2">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

            {/* TREADMILL CARD */}
            <div className="bg-pink-100 rounded-3xl flex flex-col md:flex-row items-center justify-between px-6 py-8 gap-6 overflow-hidden">
              
              <div className="flex justify-center items-center w-full md:w-1/2">
                <img
                  className="w-full max-w-[260px] object-contain"
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80"
                  alt="Treadmill"
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-right">
                <p className="text-lg text-[#1C274C] whitespace-nowrap">
                  Foldable Motorised Treadmill
                </p>

                <p className="text-[#1C274C] text-2xl font-bold">
                  Workout At Home
                </p>

                <p className="text-gray-600 font-semibold text-[22px]">
                  Flat 20% off
                </p>

                <div className="flex justify-center md:justify-end">
                  <button className="rounded-lg bg-[#02AAA4] hover:bg-[#01837e] text-white py-2 px-6 transition-all duration-300">
                    Grab Now
                  </button>
                </div>
              </div>
            </div>

            {/* WATCH CARD */}
            <div className="bg-pink-100 rounded-3xl flex flex-col-reverse md:flex-row items-center justify-between px-6 py-8 gap-6 overflow-hidden">
              
              <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
                <p className="text-lg text-[#1C274C]">
                  Apple Watch Ultra
                </p>

                <p className="text-[#1C274C] text-3xl font-bold">
                  Up to 40% Off
                </p>

                <p className="text-gray-500 text-sm leading-6">
                  The aerospace-grade titanium case strikes the perfect balance
                  of everything.
                </p>

                <div className="flex justify-center md:justify-start">
                  <button className="rounded-lg bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center w-full md:w-1/2">
                <img
                  className="w-full max-w-[260px] object-contain"
                  src="https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=1200&q=80"
                  alt="Apple Watch"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}