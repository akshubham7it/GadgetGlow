import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ShoppingCart,
  User,
  Search,
  MoreVertical,
  Plus,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, isLoggedIn, isAdmin, isSeller, logout } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [searchTerm,    setSearchTerm]    = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
        setDropdownOpen1(false);
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore?name=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const handleCategoryClick = (category: string) => {
    setDropdownOpen1(false);
    setMenuOpen(false);
    navigate(`/explore?category=${encodeURIComponent(category)}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const categories = [
    "Laptop & PC", "Watches", "Mobile & Tablets",
    "Health & Sports", "Home Appliances", "Games & Videos", "Televisions",
  ];

  return (
    <>
      <div className="shadow-md">
        <header className="max-w-[1170px] mx-auto bg-white px-8 py-4 flex items-center justify-center">

          {/* Logo */}
          <div className="flex shrink-0 items-center space-x-3 text-2xl font-bold text-blue-600">
            <Link to="/"><img className="w-15 h-15 object-contain" src="/logo.svg" alt="Logo" /></Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden sm:flex flex-1 mx-6 items-center space-x-6">

            {/* Categories */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen1(!dropdownOpen1)}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <span>Categories</span>
                <ChevronDown size={18} />
              </button>
              {dropdownOpen1 && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-sm rounded-md py-2 z-10">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 hover:text-blue-700 text-sm"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-full max-w-md">
              <input
                type="text" placeholder="I am searching for..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </button>
            </form>
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center space-x-3 text-sm">

            {/* ── AUTH SECTION ─────────────────────────────────── */}
            {isLoggedIn ? (
              /* Logged in: show Welcome + Sign out */
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <User size={24} className="text-[#3C50E0]" />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Welcome</span>
                    <span className="font-semibold text-[#1C274C] text-sm">
                      {user?.name}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md border border-red-200"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            ) : (
              /* Not logged in: show Sign in */
              <Link to="/login" className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700">
                <div className="flex">
                  <User size={28} className="mr-2 pt-1 text-[#3C50E0]" />
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500">Account</div>
                    <div className="font-semibold text-[#1C274C]">Sign in</div>
                  </div>
                </div>
              </Link>
            )}

            {/* Cart — always visible */}
            <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
              <ShoppingCart size={22} className="mr-1 text-[#3C50E0]" />
              Cart
            </Link>

            {/* Post Product — only Admin or Seller, NOT buyer-only */}
            {isLoggedIn && (isAdmin || isSeller) && (
              <Link to="/create" className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700">
                <Plus size={22} className="mr-1 text-[#3C50E0]" />
                Post Product
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden relative" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
              <MoreVertical className="mt-2" size={24} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white shadow-md rounded-md z-20 py-2 text-sm space-y-3">

                {/* Mobile search */}
                <form onSubmit={(e) => { handleSearch(e); setMenuOpen(false); }} className="px-4">
                  <div className="relative">
                    <input
                      type="text" placeholder="Search..."
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
                    />
                    <button type="submit">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </button>
                  </div>
                </form>

                {/* Mobile categories */}
                <div className="px-4">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="block w-full text-left px-2 py-1.5 text-gray-700 hover:bg-red-100 rounded text-sm"
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Mobile auth */}
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-1 text-gray-700 font-medium text-sm border-t">
                      Welcome, {user?.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 text-red-600 w-full"
                    >
                      <LogOut size={18} className="mr-2" />Sign out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700">
                    <User size={18} className="mr-2" />Sign in
                  </Link>
                )}

                <Link to="/cart" className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700">
                  <ShoppingCart size={18} className="mr-2" />Cart
                </Link>

                {isLoggedIn && (isAdmin || isSeller) && (
                  <Link to="/create" className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700">
                    <Plus size={18} className="mr-2" />Post Product
                  </Link>
                )}
              </div>
            )}
          </div>
        </header>
      </div>
    </>
  );
}