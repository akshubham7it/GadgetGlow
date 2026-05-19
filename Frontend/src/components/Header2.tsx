import { ChevronDown, Heart } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
// import MyOrders from "../Dashboard/Orders";
export default function Header2() {
  const { isAdmin, isSeller, isBuyer, isLoggedIn } = useAuth();

  const menuItems = [
    { label: "Shop with Sidebar",    to: "/explore"   },
    { label: "Shop without Sidebar", to: "/exploreno" },
    { label: "Cart",                 to: "/cart"       },
    { label: "Wishlist",             to: "/wishlist"   },
    { label: "Sign in",              to: "/login"      },
    { label: "Sign up",              to: "/signup"     },
    { label: "Contact",              to: "/contact"    },
  ];

  const blogItems = [
    "Blog Grid with Sidebar","Blog Grid without Sidebar",
    "Blog details with Sidebar","Blog details",
  ];

  return (
    <div className="shadow-md mt-4">
      <div className="hidden lg:flex items-center justify-between max-w-[1170px] mx-auto text-[16px] whitespace-nowrap text-[#1C274C] px-10 py-2">
        <div className="flex items-center space-x-8 mb-4">
          <a className="hover:underline" href="#">Popular</a>
          <Link to="/explore" className="hover:underline">Shop</Link>
          <a className="hover:underline" href="#">Contact</a>

          {/* Pages dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1">Pages <ChevronDown size={13}/></button>
            <div className="absolute left-0 top-full w-44 bg-white shadow-md rounded-md py-2 z-50 hidden group-hover:block">
              {menuItems.map((item,i)=>(
                <Link key={i} to={item.to} className="block px-4 py-2 text-sm font-normal text-gray-500 hover:bg-red-100 hover:text-blue-700">
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" className="block px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-red-100 hover:text-blue-700">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* Blogs dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1">Blogs <ChevronDown size={13}/></button>
            <div className="absolute left-0 top-full w-48 bg-white shadow-md rounded-md py-2 z-50 hidden group-hover:block">
              {blogItems.map((label,i)=>(
                <a key={i} href="#" className="block px-4 py-2 text-sm font-normal text-gray-500 hover:bg-red-100 hover:text-blue-700">{label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 mb-4">
          
          

          {/* Cart — visible if logged in as buyer OR seller */}
          {isLoggedIn && (isBuyer || isSeller) && (
            <Link to="/my-orders" className="hover:text-blue-600 font-medium text-blue-700">
              📦 My Orders
            </Link>
          )}

          {/* MyOrders — visible only to admin */}
          {isLoggedIn && isAdmin && (
            <Link to="/myorders" className="hover:text-blue-600 font-medium text-purple-700">
              📦 All Orders
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}