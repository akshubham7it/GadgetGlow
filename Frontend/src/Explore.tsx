import {
  ChevronDown,
  LayoutGrid,
  PanelBottom,
  Star,
  Eye,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const PRODUCTS_PER_PAGE = 9;

interface ProductListDto {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  category: string;
  defaultImage: string | null;
  colorImages: Record<string, string>;
  colors: string[];
  freeDelivery: boolean;
  fastDelivery: boolean;
  hasPromo: boolean;
  brandName: string | null;
}

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ── Star rating renderer ───────────────────────────────────────────
  const showRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full ${i}`} size={16} fill="#FFD400" stroke="#FFD400" />);
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4 overflow-hidden">
          <Star size={16} fill="#DDDDDD" stroke="#CCCCCC" className="absolute" />
          <div className="absolute w-[50%] h-full overflow-hidden">
            <Star size={16} fill="#FFD400" stroke="#FFD400" />
          </div>
        </div>
      );
    }
    while (stars.length < 5) {
      stars.push(<Star key={`empty ${stars.length}`} size={16} fill="#DDDDDD" stroke="#CCCCCC" />);
    }
    return stars.slice(0, 5);
  };

  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(true);
  const [brandDropdown, setBrandDropdown] = useState(false);
  const [colorDropdown, setColorDropdown] = useState(true);

  const categories = [
    "Laptop & PC", "Watches", "Mobile & Tablets", "Health & Sports",
    "Home Appliances", "Games & Videos", "Televisions",
  ];

  const brands = [
    "Apple", "Rangs Electronics", "Havit", "Samsung", "Sony",
    "Dell", "Dyson", "Garmin", "Logitech", "Generic"
  ];

  const colorOptions = [
    { className: "bg-black",                        value: "black"  },
    { className: "bg-white border border-gray-300", value: "white"  },
    { className: "bg-green-300",                    value: "green"  },
    { className: "bg-blue-500",                     value: "blue"   },
    { className: "bg-orange-500",                   value: "orange" },
    { className: "bg-gray-500",                     value: "gray"   },
  ];

  // ── Core state ─────────────────────────────────────────────────────
  const [products, setProducts] = useState<ProductListDto[]>([]);   // current page products
  const [totalCount, setTotalCount] = useState(0);                  // total matching products
  const [totalPages, setTotalPages] = useState(1);                  // total pages
  const [loading, setLoading] = useState(true);

  // Sidebar counts — how many products each category/brand has
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [brandCounts, setBrandCounts] = useState<Record<string, number>>({});

  // Current page (1-based)
  const [currentPage, setCurrentPage] = useState(1);

  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get("category");
    return cat ? [cat] : [];
  });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchName, setSearchName] = useState<string>(
    () => searchParams.get("name") ?? ""
  );

  
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const pageParams = new URLSearchParams();
      if (searchName) pageParams.append("name", searchName);
      selectedCategories.forEach((cat) => pageParams.append("category", cat));
      selectedColors.forEach((col) => pageParams.append("color", col));
      selectedBrands.forEach((b) => pageParams.append("brand", b));
      pageParams.append("page", currentPage.toString());
      pageParams.append("limit", PRODUCTS_PER_PAGE.toString());

      const res = await fetch(`${API_URL}/product?${pageParams.toString()}`);
      const data = await res.json();

      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotalCount(data.totalCount ?? 0);
      setTotalPages(data.totalPages ?? 1);

      
      const countParams = new URLSearchParams();
      if (searchName) countParams.append("name", searchName);
      selectedCategories.forEach((cat) => countParams.append("category", cat));
      selectedColors.forEach((col) => countParams.append("color", col));
      selectedBrands.forEach((b) => countParams.append("brand", b));
      countParams.append("page", "1");
      countParams.append("limit", "10000"); 

      const countRes = await fetch(`${API_URL}/product?${countParams.toString()}`);
      const countData = await countRes.json();
      const allProducts: ProductListDto[] = Array.isArray(countData.products)
        ? countData.products
        : [];

      // Count products per category
      const cCounts: Record<string, number> = {};
      categories.forEach((cat) => {
        cCounts[cat] = allProducts.filter((p) => p.category === cat).length;
      });
      setCategoryCounts(cCounts);

      // Count products per brand
      const bCounts: Record<string, number> = {};
      brands.forEach((b) => {
        bCounts[b] = allProducts.filter((p) => p.brandName === b).length;
      });
      setBrandCounts(bCounts);

    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedColors, selectedBrands, searchName]);

  
  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategories, selectedColors, selectedBrands, searchName]);

  
  useEffect(() => {
    const cat = searchParams.get("category");
    const name = searchParams.get("name");
    if (cat) { setSelectedCategories([cat]); setCurrentPage(1); }
    if (name !== null) { setSearchName(name); setCurrentPage(1); }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)  // remove if already selected
        : [...prev, category]                  // add if not selected
    );
    setSearchParams({}); // clear URL params so they don't conflict
  };

  const handleColorChange = (colorValue: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorValue)
        ? prev.filter((c) => c !== colorValue)
        : [...prev, colorValue]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSearchName("");
    setCurrentPage(1);
    setSearchParams({});
  };

 
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end   = Math.min(totalPages, start + maxVisible - 1);
      if (end === totalPages) start = Math.max(1, end - maxVisible + 1);
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  
  const resolveCardImage = (product: ProductListDto): string => {
    if (selectedColors.length > 0) {
      for (const activeColor of selectedColors) {
        if (product.colors.includes(activeColor) && product.colorImages[activeColor]) {
          return product.colorImages[activeColor];
        }
      }
    }
    return product.colorImages["default"] || product.defaultImage || "/placeholder.jpg";
  };

  return (
    <div className="mx-auto py-10">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid md:grid-cols-2 gap-3">
          <h2 className="text-2xl text-[#1C274C] mb-8 py-5 font-semibold">Explore All Products</h2>
          <div className="flex justify-end items-center text-xs">
            <a href="#" className="text-gray-600 hover:text-blue-500">Home</a>
            <span className="px-1 text-gray-600">/</span>
            <a href="#" className="text-gray-600 hover:text-blue-500">Shop</a>
            <span className="px-1 text-gray-600">/</span>
            <a className="px-1 text-blue-500" href="#">Shop with Sidebar</a>
          </div>
        </div>
      </div> 

      <div className="min-h-screen w-full bg-[#F3F4F6] py-4">
        <div className="max-w-[1170px] mx-auto w-full">

          {/* ── Top bar ── */}
          <div className="mx-auto flex flex-wrap md:flex-nowrap justify-between items-center gap-10 py-4">
            <div className="flex bg-white border border-gray-200 px-6 py-4 text-sm rounded text-gray-500 space-x-8 lg:w-[190px]">
              <p>Filters:</p>
              <button onClick={clearAllFilters} className="text-violet-700">Clean All</button>
            </div>

            <div className="flex items-center justify-between bg-white border border-gray-200 rounded px-4 py-2 text-sm text-gray-500 flex-grow">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen2(!dropdownOpen2)}
                    className="flex items-center space-x-1 border p-2 rounded-lg"
                  >
                    <p>Latest Products</p>
                    <ChevronDown size={18} />
                  </button>
                  {dropdownOpen2 && (
                    <div className="absolute top-full left-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-10">
                      <a className="block px-4 py-2 hover:bg-red-100 hover:text-black" href="#">Latest Products</a>
                      <a className="block px-4 py-2 hover:bg-red-100 hover:text-black" href="#">Best Selling</a>
                    </div>
                  )}
                </div>

                <div className="hidden md:flex items-center space-x-2 flex-wrap gap-1">
                  <p>Showing</p>
                  <span className="text-black font-medium">
                    {products.length > 0
                      ? `${(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–${Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount)}`
                      : "0"}
                  </span>
                  <p>of</p>
                  <span className="text-black font-medium">{totalCount}</span>
                  <p>Products</p>

                  {/* Active filter badges */}
                  {selectedCategories.length > 0 && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      {selectedCategories.join(", ")}
                    </span>
                  )}
                  {selectedBrands.length > 0 && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">
                      {selectedBrands.join(", ")}
                    </span>
                  )}
                  {searchName && (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                      "{searchName}"
                    </span>
                  )}
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <button><LayoutGrid size={20} /></button>
                <button><PanelBottom size={20} /></button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 py-6">

            {/* ── Sidebar filters ── */}
            <div className="flex flex-wrap md:flex-col gap-6 w-full md:w-48">

              {/* Category Filter */}
              <div className="bg-white border rounded-md p-4 w-full">
                <button
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  className="flex justify-between w-full text-gray-700 text-sm mb-2"
                >
                  <span>Category</span>
                  <ChevronDown size={18} />
                </button>
                {categoryDropdown && (
                  <div className="space-y-2 py-4">
                    {categories.map((item) => (
                      <label key={item} className="flex items-center justify-between text-[13px] whitespace-nowrap text-[#606882] gap-2">
                        <div>
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedCategories.includes(item)}
                            onChange={() => handleCategoryChange(item)}
                          />
                          {item}
                        </div>
                        <span className="bg-gray-200 text-[#606882] px-2 py-0.5 rounded-full">
                          {categoryCounts[item] ?? 0}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Brand Filter */}
              <div className="bg-white border rounded-md p-4 w-full">
                <button
                  onClick={() => setBrandDropdown(!brandDropdown)}
                  className="flex justify-between w-full text-gray-700 text-sm mb-2"
                >
                  <span>Brand</span>
                  <ChevronDown size={18} />
                </button>
                {brandDropdown && (
                  <div className="space-y-2 py-4">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center justify-between text-[13px] whitespace-nowrap text-[#606882] gap-2">
                        <div>
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                          />
                          {brand}
                        </div>
                        <span className="bg-gray-200 text-[#606882] px-2 py-0.5 rounded-full">
                          {brandCounts[brand] ?? 0}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Color Filter */}
              <div className="bg-white border rounded-md p-4 w-full">
                <button
                  onClick={() => setColorDropdown(!colorDropdown)}
                  className="flex justify-between w-full text-gray-700 text-sm mb-2"
                >
                  <span>Colors</span>
                  <ChevronDown size={18} />
                </button>
                {colorDropdown && (
                  <div className="flex flex-wrap gap-2 mt-2 py-4">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => handleColorChange(color.value)}
                        className={`${color.className} w-4 h-4 rounded-full cursor-pointer ${
                          selectedColors.includes(color.value) ? "ring-2 ring-black" : ""
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Right side: product grid + pagination ── */}
            <div className="flex-1 flex flex-col">

              {/* Product Grid */}
              {loading ? (
                <div className="flex justify-center items-center w-full py-24">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
              ) : products.length === 0 ? (
                <div className="flex justify-center items-center w-full py-24 text-gray-500">
                  No products found.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                  {products.map((product) => (
                    <div key={product.id} className="flex flex-col items-center px-4 w-72 sm:w-80">
                      <div className="relative group px-3 bg-white py-4">
                        <Link to={`detail/${product.id}`}>
                          <img
                            className="w-64 h-60 sm:w-72 sm:h-72 object-cover overflow-hidden"
                            src={resolveCardImage(product)}
                            alt={product.name}
                            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
                          />
                        </Link>
                        <div className="absolute bottom-0 left-0 right-0 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-3 px-11">
                          <button><Eye size={18} className="border-opacity-100 border-gray-500 border-solid" /></button>
                          <button className="hover:bg-blue-800 w-full px-3 rounded-lg py-1 bg-blue-600 text-white">
                            <p className="whitespace-nowrap">Add to Cart</p>
                          </button>
                          <button><Heart size={18} /></button>
                        </div>
                      </div>
                      <div className="mt-2 text-[16px] w-64 sm:w-72 text-left">
                        <div className="flex justify-start space-x-1">
                          {showRating(product.rating)}
                        </div>
                        <Link to={`detail/${product.id}`}>
                          <p className="mt-2 text-[#1C274C] hover:text-blue-500 break-words">{product.name}</p>
                        </Link>
                        <p className="text-[18px] mt-2 text-[#1C274C] flex justify-start items-center space-x-2">
                          <span>${product.discountedPrice}</span>
                          <span className="text-[#8D93A5] line-through">${product.price}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

             
              {totalPages > 1 && !loading && (
                <div className="flex items-center justify-center gap-2 mt-12 mb-4">

                  {/* Prev button — disabled on first page */}
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm text-gray-600
                               hover:bg-[#3C50E0] hover:text-white hover:border-[#3C50E0]
                               disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
                  >
                    <ChevronLeft size={16} />
                    Prev
                  </button>

                  {getPageNumbers().map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageClick(pageNum)}
                      className={`w-9 h-9 rounded-md border text-sm font-medium transition-colors
                        ${currentPage === pageNum
                          ? "bg-[#3C50E0] text-white border-[#3C50E0]"   // active page
                          : "text-gray-600 hover:bg-[#3C50E0] hover:text-white hover:border-[#3C50E0]"
                        }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-2 rounded-md border text-sm text-gray-600
                               hover:bg-[#3C50E0] hover:text-white hover:border-[#3C50E0]
                               disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* Page info text */}
              {totalPages > 1 && !loading && (
                <p className="text-center text-sm text-gray-500 mb-4">
                  Page {currentPage} of {totalPages}
                </p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}