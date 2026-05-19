import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

interface OrderItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  itemTotal: number;
  image: string;
}

interface Order {
  orderId: number;
  orderedAt: string;
  status: string;
  grandTotal: number;
  userName: string;
  userId: number;
  items: OrderItem[];
}

export default function MyOrders() {
  const { isLoggedIn, isAdmin, token } = useAuth();
  const navigate = useNavigate();

  const [orders,     setOrders]     = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [page,       setPage]       = useState(1);
  const [loading,    setLoading]    = useState(false);
  const [expanded,   setExpanded]   = useState<number | null>(null);

  // Route guard
  useEffect(() => {
    if (!isLoggedIn) { navigate("/login"); return; }
    if (!isAdmin)    { toast.error("Admin only"); navigate("/"); }
  }, [isLoggedIn, isAdmin]);

  // Fetch orders
  useEffect(() => {
    if (!isAdmin || !token) return;
    (async () => {
      setLoading(true);
      try {
        const res  = await fetch(`${API_URL}/order/myorders?page=${page}&limit=10`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders ?? []);
          setTotalPages(data.totalPages ?? 1);
          setTotalCount(data.totalCount ?? 0);
        } else {
          toast.error(data.msg || "Failed to load orders");
        }
      } catch { toast.error("Network error"); }
      finally   { setLoading(false); }
    })();
  }, [page, isAdmin, token]);

  if (!isLoggedIn || !isAdmin) return null;

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-6">
      <Toaster position="top-center" />
      <p className="text-[#0a0a0a] text-xl mb-4">
        My Orders <span className="text-sm font-normal text-gray-500">({totalCount} total)</span>
      </p>

      <div className="w-full bg-white p-4 rounded-md">

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          </div>

        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">No orders placed yet.</div>

        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-sm">
                <thead className="border-b text-[#0a0a0a]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">Buyer Name</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4 text-right">Unit Price</th>
                    <th className="py-3 px-4 text-right">Total</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) =>
                    order.items.map((item, itemIdx) => (
                      <tr
                        key={`${order.orderId}-${itemIdx}`}
                        className="border-b hover:bg-gray-50"
                      >
                        {/* Show order id only on first item row */}
                        {itemIdx === 0 ? (
                          <td className="py-3 px-4 font-medium align-top" rowSpan={order.items.length}>
                            #{order.orderId}
                          </td>
                        ) : null}

                        {/* Product */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "/placeholder.jpg"}
                              alt={item.productName}
                              className="w-10 h-10 object-contain rounded border bg-white flex-shrink-0"
                              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
                            />
                            <div>
                              <p className="font-medium text-[#1C274C]">{item.productName}</p>
                              <p className="text-xs text-gray-400">ID: {item.productId}</p>
                            </div>
                          </div>
                        </td>

                        {/* Buyer — show only on first item row */}
                        {itemIdx === 0 ? (
                          <td className="py-3 px-4 align-top" rowSpan={order.items.length}>
                            <p className="font-medium">{order.userName}</p>
                            <p className="text-xs text-gray-400">UID: {order.userId}</p>
                          </td>
                        ) : null}

                        <td className="py-3 px-4 text-center">{item.quantity}</td>
                        <td className="py-3 px-4 text-right text-gray-600">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right font-semibold text-[#1C274C]">${item.itemTotal.toFixed(2)}</td>

                        {/* Date + Status — first item only */}
                        {itemIdx === 0 ? (
                          <td className="py-3 px-4 text-gray-500 align-top" rowSpan={order.items.length}>
                            {new Date(order.orderedAt).toLocaleDateString("en-US", {
                              year: "numeric", month: "short", day: "numeric"
                            })}
                          </td>
                        ) : null}
                        {itemIdx === 0 ? (
                          <td className="py-3 px-4 align-top" rowSpan={order.items.length}>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 font-medium">
                              {order.status}
                            </span>
                          </td>
                        ) : null}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center gap-4 justify-center mt-6">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-sm">Page {page} of {totalPages}</span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}