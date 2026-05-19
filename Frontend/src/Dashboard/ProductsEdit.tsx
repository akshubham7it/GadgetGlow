import { useState, useEffect } from "react";
import { ChevronDown, Link2, Upload, X, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const categories = [
  "Laptop & PC", "Watches", "Mobile & Tablets", "Health & Sports",
  "Home Appliances", "Games & Videos", "Televisions",
];

const colorOptions = ["black", "white", "gray", "blue", "orange", "green"];

export default function ProductsEdit() {
  const navigate     = useNavigate();
  const { id }       = useParams<{ id: string }>();
  const token        = localStorage.getItem("token") || "";

  // ── Form state ────────────────────────────────────────────────────
  const [name,             setName]             = useState("");
  const [description,      setDescription]      = useState("");
  const [price,            setPrice]            = useState("");
  const [discountedPrice,  setDiscountedPrice]  = useState("");
  const [discountPercent,  setDiscountPercent]  = useState("");
  const [quantity,         setQuantity]         = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedColor1,   setSelectedColor1]   = useState("black");
  const [selectedColor2,   setSelectedColor2]   = useState("white");
  const [catOpen,          setCatOpen]          = useState(false);

  // ── Image state ───────────────────────────────────────────────────
  const [imageMode,    setImageMode]    = useState<"url" | "upload">("url");
  const [imageUrl,     setImageUrl]     = useState("");
  const [imageFile,    setImageFile]    = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading,     setLoading]     = useState(false);
  const [fetching,    setFetching]    = useState(true);

  // ── Fetch existing product to prefill ────────────────────────────
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setFetching(true);
      try {
        const res  = await fetch(`${API_URL}/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        // AdminController returns product directly inside GetProducts list
        // but single product fetch may differ — handle both shapes
        const p = data.product ?? data;

        setName(p.name            || "");
        setDescription(p.description   || "");
        setPrice(p.price?.toString()   || "");
        setDiscountedPrice(p.discountedPrice?.toString() || "");
        setDiscountPercent(p.discountPercent?.toString() || "");
        setQuantity(p.quantity?.toString()   || "");

        // Category
        const cat = p.category || categories[0];
        setSelectedCategory(categories.includes(cat) ? cat : categories[0]);

        // Colors — stored as "black,white" in DB
        const colorArr = (p.colors || p.color || "black")
          .split(",")
          .map((c: string) => c.trim())
          .filter(Boolean);
        setSelectedColor1(colorArr[0] || "black");
        setSelectedColor2(colorArr[1] || "");

        // Image — if it's a URL (starts with http) use URL mode, else upload mode
        const img = p.defaultImage || p.image || "";
        if (img) {
          if (img.startsWith("http")) {
            setImageMode("url");
            setImageUrl(img);
            setImagePreview(img);
          } else {
            // Stored as /uploads/filename.jpg — show as URL preview
            setImageMode("url");
            const fullUrl = `${API_URL.replace("/api", "")}${img}`;
            setImageUrl(fullUrl);
            setImagePreview(fullUrl);
          }
        }
      } catch {
        toast.error("Failed to load product details");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageUrl("");
  };

  // ── Submit ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim())               return toast.error("Product name is required");
    if (!price || !discountedPrice) return toast.error("Price fields are required");
    if (!quantity)                  return toast.error("Quantity is required");
    if (imageMode === "url" && !imageUrl.trim())
      return toast.error("Please enter an image URL");
    if (imageMode === "upload" && !imageFile && !imagePreview)
      return toast.error("Please upload an image");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name",            name);
      formData.append("description",     description);
      formData.append("category",        selectedCategory);
      formData.append("price",           price);
      formData.append("discountedPrice", discountedPrice);
      formData.append("discountPercent", discountPercent || "0");
      formData.append("quantity",        quantity);

      const colorString = selectedColor2
        ? `${selectedColor1},${selectedColor2}`
        : selectedColor1;
      formData.append("colors", colorString);

      if (imageMode === "url") {
        formData.append("imageUrl", imageUrl);
      } else if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`${API_URL}/admin/products/${id}`, {
        method:  "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body:    formData,
      });
      const result = await res.json();

      if (res.ok) {
        toast.success(result.msg || "Product updated successfully!");
        setTimeout(() => navigate("/admin/products"), 800);
      } else {
        toast.error(result.msg || "Failed to update product");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Loading skeleton while fetching product ───────────────────────
  if (fetching) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      {/* Header */}
      <div className="px-4 py-8">
        <div className="max-w-[1170px] mx-auto flex items-center justify-between">
          <div>
            <div className="text-black font-bold text-2xl">Edit Product</div>
            <div className="text-base pt-1 text-gray-500">Update product details below</div>
          </div>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            Back to Products
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="w-full px-4 pb-12">
          <div className="max-w-[1170px] mx-auto flex flex-col md:flex-row gap-6 min-h-[80vh]">

            {/* ── LEFT: Image Section ─────────────────────────────── */}
            <div className="md:w-1/2 w-full bg-green-100 p-6 rounded-xl border border-gray-200">
              <div className="text-[#1C274C] font-semibold text-lg mb-4">Product Image</div>

              {/* Toggle URL / Upload */}
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => { setImageMode("url"); clearImage(); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    imageMode === "url"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Link2 size={16} /> Image URL
                </button>
                <button
                  type="button"
                  onClick={() => { setImageMode("upload"); clearImage(); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    imageMode === "upload"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Upload size={16} /> Upload File
                </button>
              </div>

              {/* URL mode */}
              {imageMode === "url" && (
                <div>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 text-sm mb-3"
                  />
                  <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-white flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="text-center text-gray-400 text-sm">
                        <Link2 size={32} className="mx-auto mb-2 opacity-40" />
                        <p>Paste an image URL above</p>
                      </div>
                    )}
                  </div>
                  {imageUrl && (
                    <p className="text-xs text-green-600 mt-2">✓ Image URL ready</p>
                  )}
                </div>
              )}

              {/* Upload mode */}
              {imageMode === "upload" && (
                <div>
                  <div className="relative w-full h-64 border-2 border-dashed border-gray-400 rounded-xl bg-white flex items-center justify-center cursor-pointer overflow-hidden">
                    <input
                      type="file" accept="image/*"
                      onChange={handleFileChange}
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="text-center text-gray-400">
                        <Upload size={32} className="mx-auto mb-2 opacity-40" />
                        <p className="text-sm">Click or drag to upload</p>
                      </div>
                    )}
                  </div>
                  {imageFile && (
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-green-600">✓ {imageFile.name}</p>
                      <button type="button" onClick={clearImage} className="text-red-500 hover:text-red-700">
                        <X size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              
            </div>

            {/* ── RIGHT: Product Info ─────────────────────────────── */}
            <div className="md:w-1/2 w-full bg-green-100 p-6 rounded-xl shadow-sm">

              <div className="text-gray-800 text-lg mb-2">Product Name *</div>
              <input
                type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl px-5 py-2 mb-5 border border-gray-300 text-base bg-white"
                placeholder="Product Title"
              />

              {/* Category */}
              <div className="text-gray-800 text-lg mb-2">Category *</div>
              <div className="relative mb-5">
                <button
                  type="button"
                  onClick={() => setCatOpen(!catOpen)}
                  className="w-full flex items-center justify-between px-5 py-2 rounded-xl bg-white border border-gray-300 text-base font-semibold text-gray-800"
                >
                  <p>{selectedCategory}</p>
                  <ChevronDown size={18} />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 w-full bg-white rounded-lg border mt-1 z-10 shadow-md">
                    {categories.map((cat) => (
                      <button
                        key={cat} type="button"
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-black text-sm"
                        onClick={() => { setSelectedCategory(cat); setCatOpen(false); }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Prices */}
              <div className="flex flex-col md:flex-row gap-4 mb-5">
                <div className="flex-1">
                  <label className="block text-gray-800 text-sm mb-1">Discounted Price * ($)</label>
                  <input
                    type="number" value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                    placeholder="e.g. 450"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-800 text-sm mb-1">Original Price * ($)</label>
                  <input
                    type="number" value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                    placeholder="e.g. 500"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-5">
                <div className="flex-1">
                  <label className="block text-gray-800 text-sm mb-1">Discount %</label>
                  <input
                    type="number" value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                    placeholder="e.g. 10"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-800 text-sm mb-1">Quantity *</label>
                  <input
                    type="number" value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full rounded-lg px-4 py-2 border border-gray-300 bg-white"
                    placeholder="e.g. 50"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <label className="block text-gray-800 text-lg mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg px-4 py-3 border border-gray-300 min-h-[100px] bg-white"
                  placeholder="Write your product description here..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-indigo-900 text-white rounded-xl px-5 py-3 text-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Saving...
                  </>
                ) : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </form>
    </>
  );
}