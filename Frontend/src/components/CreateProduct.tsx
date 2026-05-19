import { useState } from "react";
import { ChevronDown, Link2, Upload } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

export default function CreateProduct() {
  const { token } = useAuth();

  // Form fields
  const [name,              setName]              = useState("");
  const [description,       setDescription]       = useState("");
  const [price,             setPrice]             = useState("");
  const [discountedPrice,   setDiscountedPrice]   = useState("");
  const [quantity,          setQuantity]          = useState("");
  const [colors,            setColors]            = useState("black");
  const [imageUrl,          setImageUrl]          = useState("");
  const [imageFile,         setImageFile]         = useState<File | null>(null);
  const [imagePreview,      setImagePreview]      = useState<string | null>(null);
  const [imageMode,         setImageMode]         = useState<"url" | "file">("url");
  const [submitting,        setSubmitting]        = useState(false);
  const [dropdownOpen,      setDropdownOpen]      = useState(false);

  const categories = [
    "Laptop & PC", "Watches", "Mobile & Tablets",
    "Health & Sports", "Home Appliances", "Games & Videos", "Televisions",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // ── Image URL input handler ─────────────────────────────────────
  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setImageUrl(val);
    setImagePreview(val.trim() !== "" ? val.trim() : null);
  };

  // ── File upload handler ─────────────────────────────────────────
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ── Switch image mode ───────────────────────────────────────────
  const switchMode = (mode: "url" | "file") => {
    setImageMode(mode);
    setImagePreview(null);
    setImageUrl("");
    setImageFile(null);
  };

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!name.trim())             return toast.error("Product name is required");
    if (!price || !discountedPrice) return toast.error("Price fields are required");
    if (!quantity)                return toast.error("Quantity is required");
    if (imageMode === "url" && !imageUrl.trim()) return toast.error("Please enter an image URL");
    if (imageMode === "file" && !imageFile)      return toast.error("Please upload an image");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name",            name.trim());
      formData.append("description",     description.trim());
      formData.append("category",        selectedCategory);
      formData.append("price",           price);
      formData.append("discountedPrice", discountedPrice);
      formData.append("quantity",        quantity);
      formData.append("colors",          colors);

      // Discount percent auto-calculated
      const p  = parseFloat(price);
      const dp = parseFloat(discountedPrice);
      const discountPercent = p > 0 ? Math.round(((p - dp) / p) * 100) : 0;
      formData.append("discountPercent", discountPercent.toString());

      if (imageMode === "url") {
        formData.append("imageUrl", imageUrl.trim());
      } else if (imageFile) {
        formData.append("image", imageFile);
      }

      const res  = await fetch(`${API_URL}/postproduct`, {
        method:  "POST",
        headers: { Authorization: `Bearer ${token}` },
        body:    formData,
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Product posted successfully! 🎉");
        // Reset form
        setName(""); setDescription(""); setPrice(""); setDiscountedPrice("");
        setQuantity(""); setColors("black"); setImageUrl(""); setImageFile(null);
        setImagePreview(null); setSelectedCategory(categories[0]);
      } else {
        toast.error(data.msg || "Failed to post product");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      {/* Header */}
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

          {/* ── Left: Image Panel ──────────────────────────────── */}
          <div className="md:w-1/2 w-full bg-green-100 p-6 rounded-xl border border-gray-200">
            <div className="text-[#1C274C] font-semibold text-lg mb-4">Add Image</div>

            {/* Mode Toggle */}
            <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-4 w-fit">
              <button
                type="button"
                onClick={() => switchMode("url")}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                  imageMode === "url"
                    ? "bg-[#1C274C] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Link2 size={14} /> Image URL
              </button>
              <button
                type="button"
                onClick={() => switchMode("file")}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors ${
                  imageMode === "file"
                    ? "bg-[#1C274C] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Upload size={14} /> Upload File
              </button>
            </div>

            {/* URL Input */}
            {imageMode === "url" && (
              <div className="mb-4">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={handleUrlInput}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg px-4 py-2 border border-gray-300 text-sm bg-white"
                />
              </div>
            )}

            {/* Preview Box */}
            <div className="relative w-full h-64 border-2 border-dashed border-gray-400 rounded-xl bg-white flex items-center justify-center cursor-pointer overflow-hidden">
              {imageMode === "file" && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
              )}
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain p-2"
                  onError={() => setImagePreview(null)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <img src="./upload.svg" alt="Upload" className="w-16 h-16 object-contain opacity-50" />
                  <p className="text-sm">
                    {imageMode === "url" ? "Enter a URL above to preview" : "Click to upload an image"}
                  </p>
                </div>
              )}
            </div>

            {imagePreview && (
              <p className="text-xs text-green-600 mt-2 font-medium">✓ Image preview loaded</p>
            )}
          </div>

          {/* ── Right: Product Info Form ───────────────────────── */}
          <div className="md:w-1/2 w-full bg-green-100 p-6 rounded-xl shadow-sm">

            {/* Product Name */}
            <div className="text-gray-800 text-lg mb-2">Product Name</div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl px-5 py-2 mb-6 border border-gray-300 text-base bg-white"
              placeholder="Product Title"
            />

            {/* Category */}
            <div className="text-gray-800 text-lg mb-2">Category</div>
            <div className="relative mb-6">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-5 py-2 rounded-xl bg-white border border-gray-300 text-base font-semibold text-gray-800"
                type="button"
              >
                <p>{selectedCategory}</p>
                <ChevronDown size={18} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white rounded-lg border mt-1 z-10 shadow-md">
                  {categories.map((cat, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-black"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(cat);
                        setDropdownOpen(false);
                      }}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Prices */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-gray-800 text-sm mb-1">
                  Discounted Price <span className="text-gray-400 text-xs">(selling price)</span>
                </label>
                <input
                  type="number"
                  value={discountedPrice}
                  onChange={(e) => setDiscountedPrice(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                  placeholder="e.g. 450"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-800 text-sm mb-1">
                  Original Price <span className="text-gray-400 text-xs">(before discount)</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                  placeholder="e.g. 500"
                />
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-gray-800 text-sm mb-1">Product Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                placeholder="e.g. 10"
              />
            </div>

            {/* Colors */}
            <div className="mb-6">
              <label className="block text-gray-800 text-sm mb-1">
                Colors <span className="text-gray-400 text-xs">(comma separated, max 2 e.g. black,white)</span>
              </label>
              <input
                type="text"
                value={colors}
                onChange={(e) => setColors(e.target.value)}
                className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                placeholder="black,white"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg mb-2">Product Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg px-4 py-3 border border-gray-300 min-h-[85px] bg-white"
                placeholder="Write your product description here..."
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-indigo-900 text-white rounded-xl px-5 py-2 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Posting...
                </span>
              ) : "Post Product"}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}