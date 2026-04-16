import { ChevronDown, Heart } from "lucide-react";
import { Link } from "react-router";

export default function Header2() {
  const menuItems = [
    { label: "Shop with Sidebar", to: "/explore" },
    { label: "Shop without Sidebar", to: "/exploreno" },
    { label: "Admin", to: "/admin" },
    { label: "Cart", to: "/cart" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Sign in", to: "/login" },
    { label: "Sign up", to: "/signup" },
    { label: "Contact", to: "/contact" },
    { label: "Error", to: "/error" },
    { label: "Mail Success", to: "/mail-success" },
  ];

  const blogItems = [
    "Blog Grid with Sidebar",
    "Blog Grid without Sidebar",
    "Blog details with Sidebar",
    "Blog details",
  ];

  return (
    <>
      <div className="shadow-md mt-4">
        <div className="hidden lg:flex items-center justify-between max-w-[1170px] mx-auto text-[16px] whitespace-nowrap text-[#1C274C] px-10 py-2 ">
          <div className="flex items-center space-x-8 mb-4">
            <a className="hover:underline" href="#">
              Popular
            </a>
            <Link to="/explore" className="hover:underline">
              Shop
            </Link>
            <a className="hover:underline" href="#">
              Contact
            </a>

            <div className="relative group">
              <button className="flex items-center gap-1">
                Pages <ChevronDown size={13} />
              </button>
              <div className="absolute left-0 top-full w-44 bg-white shadow-md rounded-md py-2 z-50 hidden group-hover:block">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.to}
                    className="block px-4 py-2 text-sm font-normal text-gray-500 hover:bg-red-100 hover:text-blue-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center gap-1">
                Blogs <ChevronDown size={13} /> 
              </button>
              <div className="absolute left-0 top-full  w-48 bg-white shadow-md rounded-md py-2 z-50 hidden group-hover:block">
                {blogItems.map((label, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block px-4 py-2 text-sm font-normal text-gray-500 hover:bg-red-100 hover:text-blue-700"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8 mb-4">
            <div className="flex gap-1 items-center">
              <img className="w-15 h-4" src="./refresh.svg" alt="" />
              <button className="hover:text-blue-600">Recently Viewed</button>
            </div>
            <div className="flex gap-1 items-center">
              <Heart size={14} />
              <button className="hover:text-blue-600">Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
