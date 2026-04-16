import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ShoppingCart,
  User,
  Search,
  MoreVertical,
  Plus,
  PhoneCall
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function Header() {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen1(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to /explore with category filter
  const handleCategoryClick = (category: string) => {
    setDropdownOpen1(false);
    setMenuOpen(false);
    navigate(`/explore?category=${encodeURIComponent(category)}`);
  };

  // Navigate to /explore with search term
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?name=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      navigate(`/explore?name=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileSearch("");
      setMenuOpen(false);
    }
  };

  const categories = [
    "Laptop & PC",
    "Watches",
    "Mobile & Tablets",
    "Health & Sports",
    "Home Appliances",
    "Games & Videos",
    "Televisions",
  ];

  return (
    <>
      <div className="shadow-md">
        <header className="max-w-[1170px] mx-auto bg-white px-8 py-4 flex items- justify-center">
          <div className="flex shrink-0 items-center space-x-3 text-2xl font-bold text-blue-600">
            <Link to={"/"}>
              <img
                className="w-15 h-15 object-contain"
                src="/logo.jpg"
                alt="Logo"
              />
            </Link>
            <span></span>
          </div>

          <nav className="hidden sm:flex flex-1 mx-6 items-center space-x-6">
            {/* Categories dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen1(!dropdownOpen1)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <span>Categories</span>
                <ChevronDown size={18} />
              </button>
              {dropdownOpen1 && (
                <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-sm rounded-md py-2 z-10">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 hover:text-blue-700"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="I am searching for..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </button>
            </form>
          </nav>

          <div className="hidden lg:flex items-center space-x-3 text-sm">
            <div className="">
              <PhoneCall size={22} className="text-[#3C50E0]" />
            </div>
            <Link to={"signin"} className="text-[#606882]">
              <div className="text-xs text-gray-500">24/7 Support</div>
              <div className="font-semibold text-[#1C274C]">
                (+965) 7492-3477
              </div>
            </Link>

            <Link
              to="/login"
              className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              <div className="flex">
                <div>
                  <User size={28} className="mr-2 pt-1 text-[#3C50E0]" />
                </div>
                <div className="flex flex-col">
                  <div className="text-xs text-gray-500">Account</div>
                  <div className="font-semibold text-[#1C274C]">Sign in</div>
                </div>
              </div>
            </Link>

            <Link
              to={"cart"}
              className="flex items-center text-gray-700 hover:text-blue-600"
            >
              <ShoppingCart size={22} className="mr-1 text-[#3C50E0]" />
              Cart
            </Link>

            <Link
              to="/create"
              className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              <Plus size={22} className="mr-1 text-[#3C50E0]" />
              Post Product
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600"
            >
              <MoreVertical className="mt-2" size={24} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-md rounded-md z-20 py-2 text-sm space-y-3">
                {/* Mobile search */}
                <form onSubmit={handleMobileSearch} className="px-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={mobileSearch}
                      onChange={(e) => setMobileSearch(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit">
                      <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                    </button>
                  </div>
                </form>

                {/* Mobile categories */}
                <div className="px-4">
                  <p className="text-xs text-gray-400 mb-1">Categories</p>
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className="block w-full text-left px-2 py-1.5 text-gray-700 hover:bg-red-100 hover:text-blue-700 rounded text-sm"
                    >
                      {category}
                    </button>
                  ))}
                </div>

                <a
                  href="#"
                  className="flex px-4 py-2 items-center hover:bg-gray-100 text-gray-700"
                >
                  <img src="/call.svg" alt="Call" className="w-5 h-5 mr-2" />
                  <div>
                    <div className="text-xs text-gray-500">24/7 Support</div>
                    <div className="font-semibold text-sm">(+965) 7492-3477</div>
                  </div>
                </a>

                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <User size={18} className="mr-2" />
                  Account
                </Link>

                <a
                  href="#"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Cart
                </a>

                <Link
                  to="/create"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  <Plus size={18} className="mr-2" />
                  Post Product
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
}