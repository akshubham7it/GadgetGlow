// src/Dashboard/MyUserOrders.tsx

import { useEffect, useState, useCallback } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ShoppingBag, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

interface UserOrderItem {
  orderItemId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
  orderedAt: string;
}

export default function MyUserOrders() {
  const { isLoggedIn, token } = useAuth();

  const [items, setItems] = useState<UserOrderItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOrders = useCallback(async () => {
    if (!isLoggedIn || !token) {
      setItems([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/order/my-user-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setItems(data.items ?? []);
      } else {
        toast.error(data.msg || "Failed to load orders");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  // ─────────────────────────────────────────────
  // NOT LOGGED IN
  // ─────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <>
        <Toaster position="top-center" />

        <div className="max-w-[1170px] mx-auto px-4 pt-10 mb-12">

          {/* Header */}
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            <h2 className="text-2xl font-bold text-[#1C274C]">
              My Orders
            </h2>

            <div className="flex justify-end items-center text-sm">
              <nav>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Home
                </Link>

                <span className="px-2 text-gray-600">/</span>

                <span className="text-blue-500">
                  My Orders
                </span>
              </nav>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-24 gap-6">

            <div className="rounded-full bg-gray-100 p-6 text-gray-400">
              <ShoppingBag size={40} />
            </div>

            <p className="text-xl font-semibold text-[#1C274C]">
              You need to sign in to view your orders
            </p>

            <p className="text-gray-500 text-sm">
              Please sign in to see products you have bought
            </p>

            <Link to="/login">
              <button className="flex items-center gap-2 bg-[#1C274C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800">
                <LogIn size={20} />
                Sign in to continue
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="max-w-[1170px] mx-auto px-4 pt-10 mb-12">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-3 mb-8">

          <h2 className="text-2xl font-bold text-[#1C274C]">
            My Orders{" "}

            <span className="text-base font-normal text-gray-500">
              ({items.length} items)
            </span>
          </h2>

          <div className="flex justify-end items-center text-sm">
            <nav>
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-500"
              >
                Home
              </Link>

              <span className="px-2 text-gray-600">/</span>

              <span className="text-blue-500">
                My Orders
              </span>
            </nav>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />

              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        ) : items.length === 0 ? (

          // Empty orders
          <div className="flex flex-col items-center justify-center py-24 gap-6">

            <div className="rounded-full bg-[#e2e3e3] p-6 text-[#606882] w-20 h-20">
              <ShoppingBag size={30} className="py-0.5" />
            </div>

            <p className="text-[#606882]">
              You have not bought any products yet.
            </p>

            <Link to="/explore">
              <button className="w-[300px] bg-[#1C274C] text-white p-4 rounded-lg font-semibold">
                Continue Shopping
              </button>
            </Link>
          </div>

        ) : (

          // Orders table
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3 text-[#1C274C] font-semibold">
                      Product
                    </th>

                    <th className="text-center px-4 py-3 text-[#1C274C] font-semibold">
                      Quantity
                    </th>

                    <th className="text-right px-4 py-3 text-[#1C274C] font-semibold">
                      Unit Price
                    </th>

                    <th className="text-right px-4 py-3 text-[#1C274C] font-semibold">
                      Total
                    </th>

                    <th className="text-right px-4 py-3 text-[#1C274C] font-semibold">
                      Bought Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, idx) => (
                    <tr
                      key={item.orderItemId}
                      className={`border-b last:border-0 ${
                        idx % 2 === 0
                          ? "bg-white"
                          : "bg-gray-50"
                      }`}
                    >
                      {/* Product */}
                      <td className="px-4 py-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={
                              item.productImageUrl ||
                              "/placeholder.jpg"
                            }
                            alt={item.productName}
                            className="w-16 h-16 object-contain rounded-lg border bg-white flex-shrink-0"
                            onError={(e) => {
                              (
                                e.target as HTMLImageElement
                              ).src = "/placeholder.jpg";
                            }}
                          />

                          <div className="font-medium text-[#1C274C] line-clamp-2 max-w-[220px]">
                            {item.productName}
                          </div>
                        </div>
                      </td>

                      {/* Qty */}
                      <td className="px-4 py-4 text-center">
                        {item.quantity}
                      </td>

                      {/* Unit Price */}
                      <td className="px-4 py-4 text-right text-gray-700">
                        ${item.unitPrice.toFixed(2)}
                      </td>

                      {/* Total */}
                      <td className="px-4 py-4 text-right font-semibold text-[#1C274C]">
                        ${item.itemTotal.toFixed(2)}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-4 text-right text-gray-500">
                        {new Date(item.orderedAt).toLocaleDateString()}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}