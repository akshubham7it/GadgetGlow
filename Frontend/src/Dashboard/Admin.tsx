import {
  UserRound,
  BadgeCheck,
  Package,
  PercentCircle,
  Plus,
  User,
  ChevronDown,
} from "lucide-react";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Admin() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Users", to: "/admin/users", icon: <UserRound size={18} /> },
    { label: "Brands", to: "/admin/brands", icon: <BadgeCheck size={18} /> },
    { label: "Products", to: "/admin/products", icon: <Package size={18} /> },
    { label: "Coupons", to: "/admin/coupons", icon: <PercentCircle size={18} /> },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setShowDropdown(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
        <div className="flex items-center gap-32">
          <Link to={"home"}>
            <img className="w-40 h-10 object-contain" src="/logo.svg" alt="Logo" />
          </Link>
          <h1 className="text-xl font-semibold text-left text-gray-800">Welcome to GadgetGlow</h1>
        </div>
        <div className="flex items-center gap-6 relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center text-blue-950 border border-blue-950 bg-white py-[6px] px-[12px] rounded-md font-medium hover:bg-blue-50"
          >
            <Plus size={18} className="mr-2" />
            Add New
            <ChevronDown size={16} className="ml-2" />
          </button>
          {showDropdown && (
            <div className="absolute top-12 right-16 w-44 bg-white border border-gray-200 rounded-md shadow-md z-10">
              <button
                onClick={() => handleNavigate("/admin/user-create")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Add User
              </button>
              <button
                onClick={() => handleNavigate("/admin/brand-create")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Add Brand
              </button>
              <button
                onClick={() => handleNavigate("/admin/product-create")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Add Product
              </button>
              <button
                onClick={() => handleNavigate("/admin/coupon-create")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Add Coupon
              </button>
            </div>
          )}
          <div className="w-10 h-10 rounded-full bg-[#606882] flex items-center justify-center">
            <User size={18} className="text-white" />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-white border-r p-4">
          <nav className="space-y-2">
            {navItems.map(({ label, to, icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 text-green-700" : "text-gray-700"
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
