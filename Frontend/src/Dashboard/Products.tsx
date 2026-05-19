import { Search, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

type Product = {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: string;
  status: string;
  // user: { id: string; name: string } | null;
  brand: { id: string; name: string } | null;
};

export default function Products() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [products,   setProducts]   = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("name", searchTerm);
      params.append("page",  page.toString());
      params.append("limit", "10");

      // ✅ Correct endpoint: /api/admin/products
      const res  = await fetch(`${API_URL}/admin/products?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (Array.isArray(data.products)) {
        setProducts(data.products);
        setTotalPages(data.totalPages ?? 1);
      } else {
        toast.error("Invalid products data");
      }
    } catch {
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, page]);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      // ✅ Correct endpoint: /api/admin/products/{id}
      const res  = await fetch(`${API_URL}/admin/products/${id}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.msg || "Product deleted");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(data.msg || "Failed to delete");
      }
    } catch {
      toast.error("Error deleting product");
    }
  };

  return (
    <div>
      <p className="text-[#0a0a0a] text-xl mb-4">Products</p>

      <div className="w-full bg-white p-4 pr-5 rounded-md">
        <Toaster position="top-center" />
        <div className="flex gap-8 items-center">
          <div className="relative w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="ml-auto">
            <button
              className="bg-[#076A41] text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate("/admin/product-create")}
            >
              + Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-md overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="text-[#0a0a0a] border-b">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Image</th>
              {/* <th className="py-3 px-4">User</th> */}
              {/* <th className="py-3 px-4">Brand</th> */}
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              {/* <th className="py-3 px-4">Status</th> */}
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className="flex flex-col justify-center items-center py-24">
                    <svg
                      className="animate-spin h-8 w-8 text-black mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    <p className="text-sm text-gray-600">Loading...</p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">

                    {/* Name */}
                    <td className="py-3 px-4 font-medium">{product.name || "-"}</td>

                    {/* Image — product.image is already a full URL or /uploads/... path */}
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img
                          src={
                            product.image.startsWith("http")
                              ? product.image                          // ← full URL (from URL mode)
                              : `${API_URL.replace("/api", "")}${product.image}` // ← /uploads/file.jpg
                          }
                          alt={product.name}
                          className="h-14 w-14 object-contain rounded border bg-gray-50"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.jpg";
                          }}
                        />
                      ) : (
                        <div className="h-14 w-14 bg-gray-100 rounded border flex items-center justify-center text-gray-400 text-xs">
                          No img
                        </div>
                      )}
                    </td>

                    {/* User — backend already returns { id, name } object */}
                    {/* <td className="py-3 px-4">{product.user?.name || "-"}</td> */}

                    {/* Brand — backend already returns { id, name } object */}
                    {/* <td className="py-3 px-4">{product.brand?.name || "-"}</td> */}

                    {/* Price */}
                    <td className="py-3 px-4">${product.price || "-"}</td>

                    {/* Quantity */}
                    <td className="py-3 px-4">{product.quantity || "-"}</td>

                    {/* Status */}
                    {/* <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td> */}

                    {/* Actions */}
                    <td className="py-3 px-4 flex gap-3 items-center mt-3">
                      <button
                        onClick={() => navigate(`/admin/products-edit/${product.id}`)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex gap-4 justify-center items-center mt-8">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}