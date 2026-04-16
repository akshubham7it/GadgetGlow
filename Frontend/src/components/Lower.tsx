export default function Lower() {
  return (
    <>
      <div className="px-4 xl:px-20 mt-28">
        <div className="bg-[#edf5f5] max-w-[1170px] mx-auto rounded-2xl flex flex-col-reverse xl:flex-row justify-between xl:px-36 gap-5">
          <div className="flex flex-col py-4 xl:py-12 gap-3 text-left px-8">
            <div className="py-1">
              <p className="text-[#1C274C] text-lg font-semibold">
                Apple iPhone 14 Plus
              </p>
            </div>
            <div>
              <p className="font-bold text-3xl xl:text-4xl text-[#1C274C]">
                UP TO 30% OFF
              </p>
            </div>
            <div className="text-gray-500 flex flex-col">
              <p>
                iPhone 14 has the same superspeedy chip that's in iPhone 13 Pro,
              </p>
              <p>
                A15 Bionic, with a 5-core GPU, powers all the latest features.
              </p>
              <button className="mt-5 bg-[#3C50E0] text-white rounded-lg hover:bg-violet-800 py-1.5 px-1.5 w-28 h-10">
                Buy Now
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img className="w-44 h-80 py-6 xl:py-12" src="./lower1.jpg" alt="" />
          </div>
        </div>

        <div className="max-w-[1170px] mx-auto py-5 mb-2 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="bg-pink-100 w-full h-auto xl:h-[336px] flex flex-col md:flex-row justify-center items-center px-4 xl:pr-5 py-5 gap-5 rounded-3xl">
              <img
                className="w-full max-w-[300px] xl:w-[490px] shrink-0"
                src="./tm.jpg"
                alt=""
              />
              <div className="w-full xl:w-auto py-3 px-2 sm:px-4 flex flex-col gap-3 text-left md:text-left xl:text-right xl:pr-16 lg:text-right">
                <p className="text-lg text-[#1C274C] whitespace-nowrap">
                  Foldable Motorised Treadmill
                </p>
                <p className="text-[#1C274C] text-2xl font-bold">
                  Workout At Home
                </p>
                <div className="flex justify-start md:justify-start lg:justify-end ">
                  <div className="flex flex-col gap-3">
                    <p className="text-gray-600 font-semibold text-[22px]">
                      Flat 20% off
                    </p>
                    <button className="rounded-lg bg-[#02AAA4] hover:bg-gray-500 text-white py-1.5 px-1.5 w-28 h-10 ">
                      Grab Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-pink-100 w-full h-auto xl:h-[336px] flex flex-col-reverse md:flex-row xl:flex-row justify-end items-center px-4 py-5 gap-5 rounded-3xl">
              <div className="w-full xl:w-auto flex flex-col gap-4 text-left md:text-left xl:text-center px-2 sm:px-4 xl:px-7">
                <p className="text-lg text-[#1C274C] mt-2 xl:mt-5">
                  Apple Watch Ultra
                </p>
                <p className="text-[#1C274C] text-2xl font-bold xl:whitespace-nowrap">
                  Up to 40% Off
                </p>
                <p className="text-gray-500 text-sm">
                  The aerospace-grade titanium case strikes the perfect balance
                  of everything.
                </p>
                <button className="rounded-lg bg-orange-600 hover:bg-red-800 text-white py-1.5 px-1.5 w-28 h-10">
                  Buy Now
                </button>
              </div>
              <img
                className="w-full max-w-[300px] xl:w-[490px]"
                src="./orangewatch.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
