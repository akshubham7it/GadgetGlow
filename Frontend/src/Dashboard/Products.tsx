import { Search, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;
const IMG_URL = import.meta.env.VITE_APP_IMAGE_URL;

type Product = {
  id?: string;
  name: string;
  image: string;
  price: string;
  quantity: string;
  status: string;
  user: string | { id: string; name: string };
  brand: string | { id: string; name: string };
};

type User = {
  id: string;
  name: string;
};

type Brand = {
  id: string;
  name: string;
  image?: string;
};

export default function Products() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);


  const fetchProducts = async () => {
        setLoading(true);

    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("name", searchTerm);
      params.append("page", page.toString());
      params.append("limit", "3");

      const res = await fetch(`${API_URL}/product?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data.products)) {
        setProducts(data.products);
        const totalCount =
          typeof data.totalCount === "number" ? data.totalCount : 0;
        setTotalPages(Math.ceil(totalCount / 3));
      } else {
        toast.error("Invalid products data");
      }
    } catch {
      toast.error("Error fetching products");
    }
        setLoading(false);

  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch {
      toast.error("Error fetching users");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${API_URL}/brand`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBrands(Array.isArray(data.brands) ? data.brands : []);
    } catch {
      toast.error("Error fetching brands");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchBrands();
  }, [searchTerm, page]);

  const deleteProduct = async (id?: string) => {
    if (!id) return;
    try {
      const res = await fetch(`${API_URL}/product/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Product deleted");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error(data.message || "Failed to delete");
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
        <div className="flex gap-8 items-start">
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
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Brand</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td colSpan={7}>
                  <div className="flex flex-col justify-center items-center py-24">
                    <svg
                      className="animate-spin h-8 w-8 text-black mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-100"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
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
                  <tr
                    key={product.id || crypto.randomUUID()}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{product.name || "-"}</td>
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img
                          src={`${IMG_URL}${product.image}`}
                          alt={product.name}
                          className="h-16 w-16 object-contain rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {typeof product.user === "object"
                        ? product.user?.name
                        : users.find((u) => u.id === product.user)?.name || "-"}
                    </td>
                    <td className="py-3 px-4">
                      {typeof product.brand === "object"
                        ? product.brand?.name
                        : brands.find((b) => b.id === product.brand)?.name ||
                          "-"}
                    </td>
                    <td className="py-3 px-4">{product.price || "-"}</td>
                    <td className="py-3 px-4">{product.quantity || "-"}</td>
                    <td className="py-3 px-4 mt-4 flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/products-edit/${product.id}`)
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>

          <div className="flex gap-8  pl-96 items-center mt-16">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
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
      </div>
    </div>
  );
}
