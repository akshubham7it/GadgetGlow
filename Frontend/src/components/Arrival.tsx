import { Eye, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

export default function Arrival() {
  const [products, setProducts] = useState<ProductListDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/product`);
        const data = await res.json();
        setProducts(Array.isArray(data.products) ? data.products : []);
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
        <Star key={`full ${i}`} size={16} fill="#FFD400" stroke="#FFD400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4 overflow-hidden">
          <Star size={16} fill="#DDDDDD" stroke="#CCCCC" className="absolute " />
          <div className="absolute w-[50%] h-full overflow-hidden">
            <Star size={16} fill="#FFD400" stroke="#FFD400" />
          </div>
        </div>
      );
    }

    while (stars.length < 5) {
      stars.push(
        <Star
          key={`empty  ${stars.length}`}
          size={16}
          fill="#DDDDDD"
          stroke="#CCCCCC"
        />
      );
    }

    return stars.slice(0, 5);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-28 py-10">
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
    );
  }

  return (
    <>
      <div>
        <div className="max-w-[1170px] mx-auto mt-28 px-5">
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            <h2 className="text-2xl text-violet-950 font-semibold py-2">
              New Arrivals
            </h2>
            <div className="flex justify-end items-center gap-2 text-sm">
              <button className="hover:bg-blue-600 p-1 rounded border-dotted">
                <Link to={'explore'}>
                  View All
                </Link>
              </button>
            </div>
          </div>

          <div>
            <div className="max-w-[1170px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
              {products.length === 0 ? (
                <p className="text-gray-500 col-span-4 text-center py-10">
                  No products found.
                </p>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="flex flex-col items-center">
                    <div className="relative group px-3 bg-gray-100 py-4 w-full space-x-3">
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
                      <div className="flex justify-start space-x-1">
                        {showRating(product.rating)}
                      </div>
                      <Link to={`detail/${product.id}`}>
                        <p className="text-sm mt-1 text-violet-950 hover:text-[#3C50E0]">
                          {product.name}
                        </p>
                      </Link>
                      <p className="text-sm mt-1 text-violet-950 flex justify-start items-center space-x-2">
                        <span className="flex">${product.discountedPrice}</span>
                        <span className="text-gray-500 line-through">
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}