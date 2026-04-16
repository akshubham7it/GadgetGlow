import {
  ChevronDown,
  LayoutGrid,
  PanelBottom,
  Star,
  Eye,
  Heart,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

interface ProductListDto {
  id: number;
  name: string;
  price: number;
  discountedPrice: number;
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

export default function ExploreNo() {
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/product`);
        const data = await res.json();
        const list = Array.isArray(data.products) ? data.products : [];
        setProducts(list);
        setTotalCount(data.totalCount ?? list.length);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const showRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full ${i}`} size={16} fill="yellow" stroke="yellow" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4 overflow-hidden">
          <Star size={16} fill="gray" stroke="gray" className="absolute " />
          <div className="absolute  w-[50%] h-full overflow-hidden">
            <Star size={16} fill="yellow" stroke="yellow" />
          </div>
        </div>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <Star
          key={`empty  ${stars.length}`}
          size={16}
          fill="gray"
          stroke="gray"
        />
      );
    }

    return stars.slice(0, 5);
  };

  return (
    <>
      <div>
        <div className="max-w-[1170px] mx-auto mt-10 px-5 ">
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            <h2 className="text-2xl text-[#1C274C]  py-5 font-semibold">
              Explore All Products
            </h2>
            <div className="flex justify-end items-center text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-500">
                Home
              </a>
              <span className="px-1 text-gray-600">/</span>
              <a href="#" className="text-gray-600 hover:text-blue-500">
                Shop
              </a>
              <span className="px-1 text-gray-600">/</span>
              <a className="px-1 text-blue-500" href="#">
                Shop without Sidebar
              </a>
            </div>
          </div>
        </div>

        <div className="bg-[#F3F4F6] min-h-screen ">
          <div className="pt-12 max-w-[1170px] mx-auto ">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-500 flex-grow  ">
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
                      <a
                        className="block px-4 py-2 hover:bg-red-100 hover:text-black"
                        href="#"
                      >
                        Latest Products
                      </a>
                      <a
                        className="block px-4 py-2 hover:bg-red-100 hover:text-black"
                        href="#"
                      >
                        Best Selling
                      </a>
                    </div>
                  )}
                </div>

                <div className="hidden md:flex items-center space-x-2">
                  <p>Showing</p>
                  <span className="text-black">{products.length} of {totalCount}</span>
                  <p>Products</p>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-2">
                <button>
                  <LayoutGrid size={20} />
                </button>
                <button>
                  <PanelBottom size={20} />
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-24">
                <svg
                  className="animate-spin h-8 w-8 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </div>
            ) : products.length === 0 ? (
              <div className="flex justify-center items-center py-24 text-gray-500">
                No products found.
              </div>
            ) : (
              <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5 ">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col items-center">
                    <div className="relative group px-3 bg-white py-4 w-full space-x-3">
                      <Link to={`detail/${product.id}`}>
                        <img
                          className="w-full h-48 sm:h-56 object-cover"
                          src={product.defaultImage || "/placeholder.jpg"}
                          alt={product.name}
                        />
                      </Link>
                      <div className="absolute bottom-0 left-0 right-0 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                        <button>
                          <Eye size={18} />
                        </button>
                        <button className="hover:bg-blue-800 px-2 rounded-lg p-1 bg-blue-600 text-white">
                          Add to Cart
                        </button>
                        <button>
                          <Heart size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 text-left">
                      <div className="flex justify-start space-x-1 ">
                        {showRating(product.rating)}
                      </div>
                      <Link to={`detail/${product.id}`}>
                        <p className="text-sm mt-1 text-violet-950 hover:text-[#3C50E0] ">
                          {product.name}
                        </p>
                      </Link>
                      <p className="text-sm mt-1 text-violet-950 flex justify-start  items-center space-x-2 ">
                        <span className="flex">${product.discountedPrice}</span>
                        <span className="text-gray-500 line-through">
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}