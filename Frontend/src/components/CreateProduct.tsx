import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CreateProduct() {
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = [
    "Laptop & PC",
    "Watches",
    "Mobile & Tablets",
    "Health & Sports",
    "Home Appliances",
    "Games & Videos",
    "Televisions",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handlefileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="px-4 py-8">
        <div className="max-w-[1170px] mx-auto">
          <div className="text-center text-black font-bold text-2xl">Sell your Product</div>
          <div className="text-center text-base pt-1.5">
            <span className="text-black">You are posting this product for</span>
            <span className="text-yellow-500 font-bold ml-1">✨Free✨</span>
          </div>
        </div>
      </div>

      <div className="w-full px-4 pb-12">
        <div className="max-w-[1170px] mx-auto flex flex-col md:flex-row gap-6 min-h-[80vh]">
          {/* Image Upload */}
          <div className="md:w-1/2 w-full bg-green-100 p-6 rounded-xl border border-gray-200 ">
            <div className="text-[#1C274C] font-semibold text-lg mb-4">Add Image</div>
            <div className="relative w-full h-64 border-2 border-dashed border-gray-400 rounded-xl bg-white flex items-center justify-center cursor-pointer overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handlefileUpload}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
              ) : (
                <img src="./upload.svg" alt="Upload" className="w-20 h-20 object-contain" />
              )}
            </div>
          </div>

          {/* Product Info Form */}
          <div className="md:w-1/2 w-full bg-green-100 p-6 rounded-xl shadow-sm">
            <div className="text-gray-800 text-lg mb-2">Product Name</div>
            <input
              type="text"
              className="w-full rounded-xl px-5 py-2 mb-6 border border-gray-300 text-base"
              placeholder="Product Title"
            />

            <div className="text-gray-800 text-lg mb-2">Brand</div>
            <div className="relative mb-6">
              <button
                onClick={() => setDropdownOpen1(!dropdownOpen1)}
                className="w-full flex items-center justify-between px-5 py-2 rounded-xl bg-white border border-gray-300 text-base font-semibold text-gray-800"
                type="button"
              >
                <p>{selectedCategory}</p>
                <ChevronDown size={18} />
              </button>
              {dropdownOpen1 && (
                <div className="absolute top-full left-0 w-full bg-white rounded-lg border mt-1 z-10">
                  {categories.map((cat, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-black"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(cat);
                        setDropdownOpen1(false);
                      }}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="new-price" className="block text-gray-800 text-sm mb-1">New Price</label>
                <input
                  type="text"
                  className="w-full rounded-lg px-4 py-2 border border-gray-300"
                  placeholder="New Price"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="old-price" className="block text-gray-800 text-sm mb-1">Old Price</label>
                <input
                  type="text"
                  className="w-full rounded-lg px-4 py-2 border border-gray-300"
                  placeholder="Old Price"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="quantity" className="block text-gray-800 text-sm mb-1">Product Quantity</label>
              <input
                type="text"
                className="w-full rounded-lg px-4 py-2 border border-gray-300"
                placeholder="Quantity"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-800 text-lg mb-2">Product Description</label>
              <textarea
                id="description"
                className="w-full rounded-lg px-4 py-3 border border-gray-300 min-h-[85px]"
                placeholder="Write your product description here..."
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-indigo-900 text-white rounded-xl px-5 py-2 text-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
