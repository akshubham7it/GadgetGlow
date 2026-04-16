import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle, Plus, Minus, Heart, Star } from "lucide-react";
import Recent from "./Recent";
import Description from "./Description";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const COLOR_STYLES: Record<string, string> = {
  black:  "bg-black",
  white:  "bg-white border border-gray-400",
  green:  "bg-green-300",
  blue:   "bg-blue-500",
  orange: "bg-orange-500",
  gray:   "bg-gray-500",
};

interface ProductDetailDto {
  id: number;
  name: string;
  description: string;
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
  quantity: number;
  isActive: boolean;
}

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductDetailDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/product/${id}`);
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json();
        const p: ProductDetailDto = data.product;
        setProduct(p);
        if (p.colors.length > 0) setSelectedColor(p.colors[0]);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const showRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} fill="yellow" stroke="yellow" />);
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4 overflow-hidden">
          <Star size={16} fill="gray" stroke="gray" className="absolute" />
          <div className="absolute w-[50%] h-full overflow-hidden">
            <Star size={16} fill="yellow" stroke="yellow" />
          </div>
        </div>
      );
    }
    while (stars.length < 5) {
      stars.push(<Star key={`empty-${stars.length}`} size={16} fill="gray" stroke="gray" />);
    }
    return stars.slice(0, 5);
  };

  const increaseQuantity = () => setQuantity((prev) => (prev < 10 ? prev + 1 : prev));
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  // Resolve image based on selected color
  const currentImage =
    (selectedColor && product?.colorImages[selectedColor]) ||
    product?.colorImages["default"] ||
    product?.defaultImage ||
    "/placeholder.jpg";

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  if (notFound || !product) {
    return <p className="text-center py-10 text-red-500"><h1>Product not found.</h1></p>;
  }

  return (
    <>
      <div className="max-w-[1170px] mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1C274C]">Shop Details</h2>
          </div>
          <div className="flex justify-end items-center text-sm sm:justify-start sm:text-left">
            <nav aria-label="breadcrumb">
              <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
              <span className="px-2 text-gray-600">/</span>
              <Link to="/explore" className="text-gray-600 hover:text-blue-500">Shop</Link>
              <span className="px-2 text-gray-600">/</span>
              <span className="px-1 text-blue-500">Shop Details</span>
            </nav>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 py-4">

          {/* Product image — changes when color button pressed */}
          <div className="p-2 rounded-md bg-gray-50 flex items-center justify-center min-h-[350px]">
            <img
              key={currentImage}
              className="object-contain w-full h-auto max-h-[450px]"
              src={currentImage}
              alt={product.name}
              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
            />
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h3 className="text-2xl lg:text-4xl font-bold text-blue-900 py-14">
                {product.name}
              </h3>
              {/* Dynamic discount percent from DB */}
              {product.discountPercent > 0 && (
                <span className="bg-blue-700 hover:bg-violet-900 text-white text-sm px-3 py-1 rounded-md font-semibold mt-1 whitespace-nowrap">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center mt-2 space-x-2 text-sm text-gray-500">
              <span className="flex">{showRating(product.rating)}</span>
              <span>{`( ${product.reviewCount} customer review )`}</span>
              <CheckCircle size={19} className="text-green-600" />
              <span className="text-green-600">In Stock</span>
            </div>

            <div className="mt-4 text-lg">
              Price:{" "}
              <span className="font-bold text-black">${product.discountedPrice}</span>{" "}
              <span className="line-through text-gray-800">${product.price}</span>
            </div>

            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              {product.freeDelivery && (
                <li><div className="flex gap-2"><CheckCircle size={19} className="text-[#3C50E0]" />Free delivery available</div></li>
              )}
              {product.hasPromo && (
                <li><div className="flex gap-2"><CheckCircle size={19} className="text-[#3C50E0]" />Sales {product.discountPercent}% Off — Use Code: <span className="font-semibold">PROMO30</span></div></li>
              )}
              {product.fastDelivery && (
                <li><div className="flex gap-2"><CheckCircle size={19} className="text-[#3C50E0]" />Fast Delivery</div></li>
              )}
            </ul>

            <hr className="my-4" />

            {/* Color buttons */}
            <div className="mb-4">
              <span className="font-medium">Color: </span>
              <span className="text-sm text-gray-500 ml-2 capitalize">{selectedColor}</span>
              <div className="flex space-x-3 mt-2">
                {product.colors.map((col) => (
                  <button
                    key={col}
                    type="button"
                    title={col}
                    onClick={() => setSelectedColor(col)}
                    className={`w-6 h-6 rounded-full border-2 ${COLOR_STYLES[col] ?? "bg-gray-200"} ${
                      selectedColor === col ? "border-black scale-110" : "border-gray-300"
                    } transition-transform`}
                  />
                ))}
              </div>
            </div>

            <hr className="my-4" />

            <div className="flex flex-wrap items-center gap-2 lg:space-x-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button type="button" onClick={decreaseQuantity} className="w-8 h-8 flex items-center justify-center text-lg text-gray-700 hover:bg-gray-200">
                  <Minus size={16} />
                </button>
                <span className="h-8 w-10 flex items-center justify-center border-l border-r text-lg">{quantity}</span>
                <button type="button" onClick={increaseQuantity} className="w-8 h-8 flex items-center justify-center text-lg text-gray-700 hover:bg-gray-200">
                  <Plus size={16} />
                </button>
              </div>

              <div className="w-full lg:w-auto">
                <button type="button" className="w-28 lg:w-28 h-9 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium mt-2 lg:mt-0">
                  Purchase Now
                </button>
              </div>

              <button type="button" className="w-28 h-9 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium">
                Add to Cart
              </button>

              <div className="w-full mt-2 lg:w-auto lg:mt-0">
                <button type="button" className="hover:bg-red-800 p-2 rounded-full">
                  <Heart className="w-6 h-6 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Description />
      <Recent />
    </>
  );
}