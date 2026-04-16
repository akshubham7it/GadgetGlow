import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export default function Cart() {
  return (
    <>
      <div className="max-w-[1170px] mx-auto px-4 pt-10 mb-12">
        <div className="grid md:grid-cols-2 gap-3 mb-8 stroke-black">
          <div>
            <h2 className="text-2xl font-bold text-[#1C274C] ">Cart</h2>
          </div>
          <div className="flex justify-end items-center text-sm">
            <nav aria-label="breadcrumb">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                Home
              </a>
              <span className="px-2 text-gray-600">/</span>
              <a className="px-4 text-blue-500" href="#">
                Cart
              </a>
            </nav>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex flex-col items-center justify-center pt-12 gap-8">
            <div className="rounded-full bg-[#e2e3e3] p-6 text-[#606882] w-20 h-20">
              <ShoppingCart size={30} className="py-0.5" />
            </div>

            <div>
                <p className="text-[#606882]">Your cart is empty!</p>
            </div>

            <div>
              <Link to={'explore'}>
                <button className="w-[300px] bg-[#1C274C] text-white p-4 rounded-lg font-semibold">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
