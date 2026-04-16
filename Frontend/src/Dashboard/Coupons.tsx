import { Search, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

type Coupon = {
  id: string;
  name: string;
  code: string;
  image: string;
  description: string;
  is_active: boolean;
  discount_type: "Percentage" | "Amount";
  discount_value: number;
  date_created: string;
  expire_after: string;
};

export default function Coupons() {
  const navigate = useNavigate();
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [statusSearch, setStatusSearch] = useState("");
  const [discountTypeSearch, setDiscountTypeSearch] = useState("");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDiscountType, setSelectedDiscountType] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token") || "";
  const [loading, setLoading] = useState(false);

  const statuses = ["Active", "In Active"];
  const discountTypes = ["Percentage", "Amount"];

  const filteredStatuses = statuses.filter((status) =>
    status.toLowerCase().includes(statusSearch.toLowerCase())
  );
  const filteredDiscountTypes = discountTypes.filter((type) =>
    type.toLowerCase().includes(discountTypeSearch.toLowerCase())
  );

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedStatus) {
        const isActive = selectedStatus === "Active" ? "true" : "false";
        params.append("status", isActive);
      }
      if (selectedDiscountType) { 
        params.append("discount_type", selectedDiscountType.toLowerCase());
      }
      if (searchTerm) {
        params.append("search", searchTerm);
      }
      params.append("page", page.toString());
      params.append("limit", "3");

      const res = await fetch(`${API_URL}/coupon?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCoupons(Array.isArray(data.coupons) ? data.coupons : []);
      setTotalPages(
        typeof data.totalPages === "number"
          ? data.totalPages
          : Math.ceil((data.totalCount || 1) / 3)
      );
    } catch {
      toast.error("Error fetching coupons");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCoupons();
  }, [selectedStatus, selectedDiscountType, page]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setPage(1);
      fetchCoupons();
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const deleteCoupon = async (id?: string) => {
    if (!id) return;
    try {
      const res = await fetch(`${API_URL}/coupon/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Coupon deleted");
        setCoupons((prev) => prev.filter((c) => c.id !== id));
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch {
      toast.error("Error deleting coupon");
    }
  };

  return (
    <div>
      <p className="text-[#0a0a0a] text-xl mb-4">Coupons</p>
      <div className="w-full max-w-screen bg-white p-4 pr-5 rounded-md">
        <Toaster position="top-center" />
        <div className="flex gap-8 items-start flex-wrap">
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
              onClick={() => {
                setDropdownOpen1(!dropdownOpen1);
                setDropdownOpen2(false);
              }}
              className="flex items-center space-x-1.5 border px-4 py-2 w-36 rounded-lg"
            >
              <p className="text-[#8B8B8B]">
                {selectedStatus || "Select Status"}
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
                {filteredStatuses.map((status) => (
                  <div
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setDropdownOpen1(false);
                      setStatusSearch("");
                      setPage(1);
                    }}
                    className="block px-4 py-2 hover:bg-red-100 hover:text-black cursor-pointer"
                  >
                    {status}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative text-sm">
            <button
              onClick={() => {
                setDropdownOpen2(!dropdownOpen2);
                setDropdownOpen1(false);
              }}
              className="flex items-center space-x-1.5 border px-4 py-2 w-40 rounded-lg"
            >
              <p className="text-[#8B8B8B]">
                {selectedDiscountType || "Discount Type"}
              </p>
              <ChevronDown size={18} className="ml-3" />
            </button>
            {dropdownOpen2 && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-md rounded-md py-2 z-10">
                <div className="px-2 mb-2">
                  <input
                    type="text"
                    placeholder="Search Type"
                    value={discountTypeSearch}
                    onChange={(e) => setDiscountTypeSearch(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                {filteredDiscountTypes.map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setSelectedDiscountType(type);
                      setDropdownOpen2(false);
                      setDiscountTypeSearch("");
                      setPage(1);
                    }}
                    className="block px-4 py-2 hover:bg-red-100 hover:text-black cursor-pointer"
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="ml-auto">
            <button
              className="bg-[#076A41] text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate("/admin/coupon-create")}
            >
              + Add Coupon
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white p-4 rounded-md overflow-x-auto">
        <>
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-[#0a0a0a] border-b">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">IsActive</th>
                <th className="py-3 px-4">Discount Type</th>
                <th className="py-3 px-4">Discount Value</th>
                <th className="py-3 px-4">Expiry Date</th>
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
                {coupons.length > 0 ? (
                  coupons.map((coupon) => (
                    <tr key={coupon.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{coupon.code || "-"}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            coupon.is_active
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {coupon.is_active ? "Active" : "In Active"}
                        </span>
                      </td>
                      <td className="py-3 px-4">{coupon.discount_type}</td>
                      <td className="py-3 px-4">{coupon.discount_value}</td>
                      <td className="py-3 px-4">
                        {new Date(coupon.expire_after).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 flex gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admin/coupons-edit/${coupon.id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => deleteCoupon(coupon.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500">
                      No coupons found.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>

          <div className="flex gap-8  pl-96 items-center mt-24">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      </div>
    </div>
  );
}
