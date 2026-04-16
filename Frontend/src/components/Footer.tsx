import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 shadow-md z-50">
      <div className="max-w-[1170px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="col-span-2">
          <h2 className="text-[22px] mb-4 text-[#1C274C]">Help & Support</h2>
          <ul className="space-y-4 text-sm lg:text-base text-[#606882]">
            <li className="flex items-start gap-2.5">
              <img src="./location.svg" alt="" /> 685 Market Street, Las Vegas,
              <br />
              LA 95820, United States.
            </li>
            <li className="flex items-start gap-2">
              <img src="./call.svg" alt="" /> (+099) 532-786-9843
            </li>
            <li className="flex items-start gap-2">
              <img src="./mail.svg" alt="" /> support@example.com
            </li>
          </ul>
          <div className="flex mt-6 space-x-5 text-lg text-gray-500">
            <a href="#"><img src="./facebook.svg" alt="" /></a>
            <a href="#"><img src="./twitter.svg" alt="" /></a>
            <a href="#"><img src="./instagram.svg" alt="" /></a>
            <a href="#"><img src="./linkedin.svg" alt="" /></a>
          </div>
        </div>
        <div>
          <h2 className="text-[22px] mb-4 text-[#1C274C]">Account</h2>
          <ul className="space-y-2 text-sm lg:text-base text-[#606882]">
            <li><Link to="/login">Login / Register</Link></li>
            <li><a href="#">Cart</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Shop</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-[22px] mb-4 text-[#1C274C]">Quick Link</h2>
          <ul className="space-y-2 text-sm lg:text-base text-[#606882]">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">FAQ's</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-[22px] mb-4 text-[#1C274C] flex items-center">Download App</h2>
          <p className="text-sm lg:text-base mb-4 text-[#606882] ">Save $3 With App & New User only</p>
          <div className="flex flex-col items-start">
            <a href="#"><img src="/appstore.jpg" alt="App Store" className="w-44 mb-2" /></a>
            <a href="#"><img src="/playstore.jpg" alt="Google Play" className="w-44 mb-2" /></a>
          </div>
        </div>
      </div>
      <div className="bg-[#F9FAFB]">
        <div className="max-w-[1170px] mx-auto py-3 px-2 text-center flex flex-col md:flex-row md:justify-between md:items-center text-sm">
          <p className="text-gray-500 text-xs sm:text-sm md:text-base font-semibold mb-2 md:mb-0">
            &copy; 2025. All rights reserved by Pimjo.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <span className="text-gray-500 text-xs sm:text-sm md:text-base font-semibold">We Accept:</span>
            <a href=""><img src="/visa.jpg" alt="Visa" className="w-9 h-6 sm:w-13 sm:h-8 md:w-14 md:h-10" /></a>
            <a href=""><img src="/paypal.jpg" alt="PayPal" className="w-9 h-6 sm:w-13 sm:h-8 md:w-14 md:h-10" /></a>
            <a href=""><img src="/mastercard.jpg" alt="MasterCard" className="w-9 h-6 sm:w-13 sm:h-8 md:w-14 md:h-10" /></a>
            <a href=""><img src="/applepay.jpg" alt="ApplePay" className="w-9 h-6 sm:w-13 sm:h-8 md:w-14 md:h-10" /></a>
            <a href=""><img src="/gpay.jpg" alt="GooglePay" className="w-9 h-6 sm:w-13 sm:h-8 md:w-14 md:h-10" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
