import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;
const IMG_URL = import.meta.env.VITE_APP_IMAGE_URL;

type Brand = {
  id: string;
  name: string;
  image: string;
  description: string;
  is_active: boolean;
};

export default function Brands() {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [statusSearch, setStatusSearch] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const statuses = ["Active", "In Active"];
  const filteredStatuses = statuses.filter((status) =>
    status.toLowerCase().includes(statusSearch.toLowerCase())
  );

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        if (selectedStatus) {
          const isActive = selectedStatus === "Active" ? "true" : "false";
          params.append("status", isActive);
        }
        params.append("limit", "3");
        params.append("page", page.toString());
        const res = await fetch(`${API_URL}/brand?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBrands(Array.isArray(data.brands) ? data.brands : []);
        setTotalPages(
          typeof data.totalPages === "number"
            ? data.totalPages
            : Math.ceil((data.totalCount || 1) / 3)
        );
      } catch {
        toast.error("Error fetching brands");
      }
      setLoading(false);
    };
    fetchBrands();
  }, [selectedStatus, page, token]);

  const deleteBrand = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/brand/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Brand deleted");
        setBrands((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch {
      toast.error("Error deleting brand");
    }
  };

  const filteredBrands = brands.filter((brand) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      brand.name.toLowerCase().includes(term) ||
      brand.description.toLowerCase().includes(term) ||
      (brand.is_active ? "active" : "in active").includes(term)
    );
  });

  return (
    <div>
      <p className="text-[#0a0a0a] text-xl mb-4">Brands</p>
      <div className="w-full max-w-screen bg-white p-4 pr-5 rounded-md">
        <Toaster position="top-center" />
        <div className="flex gap-8 items-start">
          <div className="relative w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="I am searching for..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div className="relative text-sm">
            <button
              onClick={() => setDropdownOpen1(!dropdownOpen1)}
              className="flex items-center space-x-1.5 border px-4 py-2 w-36 rounded-lg"
            >
              <p className="text-[#8B8B8B]">
                {selectedStatus ? selectedStatus : "Select Status"}
              </p>
              <ChevronDown size={18} className="ml-3" />
            </button>
            {dropdownOpen1 && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-md rounded-md py-2 z-10">
                <div className="px-2 mb-2">
                  <input
                    type="text"
                    placeholder="Search Status"
                    value={statusSearch}
                    onChange={(e) => setStatusSearch(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                {filteredStatuses.length > 0 ? (
                  filteredStatuses.map((status) => (
                    <div
                      key={status}
                      onClick={() => {
                        setSelectedStatus(status);
                        setDropdownOpen1(false);
                        setStatusSearch("");
                        setPage(1);
                        setSearchTerm("");
                      }}
                      className="block px-4 py-2 hover:bg-red-100 hover:text-black cursor-pointer"
                    >
                      {status}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No data found</div>
                )}
              </div>
            )}
          </div>
          <div className="ml-auto">
            <button
              className="bg-[#076A41] text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate("/admin/brand-create")}
            >
              + Add Brand
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white p-4 rounded-md overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="text-[#0a0a0a] border-b">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <td colSpan={6}>
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
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <tr key={brand.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{brand.name || "-"}</td> 
                    <td className="py-3 px-3">
                      {brand.image ? (
                        <img
                          src={`${IMG_URL}${brand.image}`}
                          alt={brand.name}
                          className="h-16 w-16 object-contain rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-3 px-4">{brand.description || "-"}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-2 text-xs rounded ${
                          brand.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {brand.is_active ? "Active" : "In Active"}
                      </span>
                    </td>
                    <td className="py-3 px-4 mt-5 flex gap-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/brands-edit/${brand.id}`)
                        }
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteBrand(brand.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No brands found.
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
