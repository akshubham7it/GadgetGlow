import { useState, useEffect, useCallback } from "react";
import { ShoppingCart, Trash2, Plus, Minus, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

// 4 products per page as requested
const ITEMS_PER_PAGE = 4;

interface CartItem {
  cartItemId:  number;
  productId:   number;
  productName: string;
  productImage:string;
  unitPrice:   number;
  quantity:    number;
  itemTotal:   number;
  maxQuantity: number;
}

export default function Cart() {
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const [items,       setItems]       = useState<CartItem[]>([]);
  const [grandTotal,  setGrandTotal]  = useState(0);
  const [totalCount,  setTotalCount]  = useState(0);
  const [totalPages,  setTotalPages]  = useState(1);
  const [page,        setPage]        = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  // Track which items are currently being updated (shows spinner on +/- button)
  const [updating,    setUpdating]    = useState<Record<number, boolean>>({});

  const fetchCart = useCallback(async () => {
    if (!isLoggedIn || !token) return;
    setLoading(true);
    try {
      const res  = await fetch(`${API_URL}/cart?page=${page}&limit=${ITEMS_PER_PAGE}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setItems(data.items ?? []);
        setGrandTotal(data.grandTotal ?? 0);
        setTotalCount(data.totalCount ?? 0);
        setTotalPages(data.totalPages ?? 1);
      }
    } catch {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, token, page]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  // ── Update quantity — calls PATCH /api/cart/{id} ─────────────────
  const updateQuantity = async (cartItemId: number, newQty: number) => {
    if (newQty < 1) return;
    setUpdating((prev) => ({ ...prev, [cartItemId]: true }));
    try {
      const res  = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method:  "PATCH",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQty }),
      });
      const data = await res.json();
      if (res.ok) {
        // Update only the changed item — no full re-fetch needed
        setItems((prev) =>
          prev.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: data.quantity, itemTotal: data.itemTotal }
              : item
          )
        );
        // Update grand total immediately
        setGrandTotal(data.grandTotal);
      } else {
        toast.error(data.msg || "Failed to update quantity");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setUpdating((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  // ── Remove item ──────────────────────────────────────────────────
  const removeItem = async (cartItemId: number) => {
    setUpdating((prev) => ({ ...prev, [cartItemId]: true }));
    try {
      const res  = await fetch(`${API_URL}/cart/${cartItemId}`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
        setTotalCount((prev) => prev - 1);
        setGrandTotal(data.grandTotal);
        toast.success("Item removed");
        // If page is now empty and we're not on page 1, go back
        if (items.length === 1 && page > 1) setPage((p) => p - 1);
      } else {
        toast.error(data.msg || "Failed to remove item");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setUpdating((prev) => ({ ...prev, [cartItemId]: false }));
    }
  };

  // ── Clear entire cart ────────────────────────────────────────────
  const clearCart = async () => {
    if (!confirm("Clear all items from your cart?")) return;
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method:  "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setItems([]);
        setGrandTotal(0);
        setTotalCount(0);
        setPage(1);
        toast.success("Cart cleared");
      }
    } catch {
      toast.error("Failed to clear cart");
    }
  };
  const handleCheckout = async () => {
  setCheckingOut(true);
  try {
    const res = await fetch(`${API_URL}/order/checkout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Order placed successfully! 🎉");
      setItems([]);
      setGrandTotal(0);
      setTotalCount(0);
      setPage(1);
    } else {
      toast.error(data.msg || "Checkout failed");
    }
  } catch {
    toast.error("Network error");
  } finally {
    setCheckingOut(false);
  }
};

  // ── NOT LOGGED IN ────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="max-w-[1170px] mx-auto px-4 pt-10 mb-12">
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          <h2 className="text-2xl font-bold text-[#1C274C]">Cart</h2>
          <div className="flex justify-end items-center text-sm">
            <nav>
              <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
              <span className="px-2 text-gray-600">/</span>
              <span className="text-blue-500">Cart</span>
            </nav>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-24 gap-6">
          <div className="rounded-full bg-gray-100 p-6 text-gray-400">
            <ShoppingCart size={40} />
          </div>
          <p className="text-xl font-semibold text-[#1C274C]">You need to sign in to view your cart</p>
          <p className="text-gray-500 text-sm">Please sign in to add and manage products in your cart</p>
          <Link to="/login">
            <button className="flex items-center gap-2 bg-[#1C274C] text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800">
              <LogIn size={20} />
              Sign in to continue
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="max-w-[1170px] mx-auto px-4 pt-10 mb-12">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-3 mb-8">
          <h2 className="text-2xl font-bold text-[#1C274C]">
            Cart {totalCount > 0 && <span className="text-base font-normal text-gray-500">({totalCount} items)</span>}
          </h2>
          <div className="flex justify-end items-center text-sm">
            <nav>
              <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
              <span className="px-2 text-gray-600">/</span>
              <span className="text-blue-500">Cart</span>
            </nav>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
          </div>

        ) : items.length === 0 ? (
          /* Empty cart */
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="rounded-full bg-[#e2e3e3] p-6 text-[#606882] w-20 h-20">
              <ShoppingCart size={30} className="py-0.5" />
            </div>
            <p className="text-[#606882]">Your cart is empty!</p>
            <Link to="/explore">
              <button className="w-[300px] bg-[#1C274C] text-white p-4 rounded-lg font-semibold">
                Continue Shopping
              </button>
            </Link>
          </div>

        ) : (
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Cart Table ─────────────────────────────────────── */}
            <div className="flex-1">

              {/* Clear cart button */}
              <div className="flex justify-end mb-3">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 hover:underline"
                >
                  Clear all items
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left px-4 py-3 text-[#1C274C] font-semibold">Product</th>
                      <th className="text-center px-4 py-3 text-[#1C274C] font-semibold">Quantity</th>
                      <th className="text-right px-4 py-3 text-[#1C274C] font-semibold">Unit Price</th>
                      <th className="text-right px-4 py-3 text-[#1C274C] font-semibold">Total</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr
                        key={item.cartItemId}
                        className={`border-b last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        {/* Product image + name */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.productImage || "/placeholder.jpg"}
                              alt={item.productName}
                              className="w-16 h-16 object-contain rounded-lg border bg-white flex-shrink-0"
                              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.jpg"; }}
                            />
                            <div>
                              <Link
                                to={`/explore/detail/${item.productId}`}
                                className="font-medium text-[#1C274C] hover:text-blue-600 line-clamp-2 max-w-[160px]"
                              >
                                {item.productName}
                              </Link>
                            </div>
                          </div>
                        </td>

                        {/* Quantity controls — same style as Detail page */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center border rounded-md overflow-hidden w-28 mx-auto">
                            <button
                              type="button"
                              disabled={updating[item.cartItemId] || item.quantity <= 1}
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="h-8 w-10 flex items-center justify-center border-l border-r text-sm font-medium">
                              {updating[item.cartItemId] ? (
                                <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                                </svg>
                              ) : item.quantity}
                            </span>
                            <button
                              type="button"
                              disabled={updating[item.cartItemId] || item.quantity >= item.maxQuantity}
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-center text-xs text-gray-400 mt-1">
                            max: {item.maxQuantity}
                          </p>
                        </td>

                        {/* Unit price */}
                        <td className="px-4 py-4 text-right text-gray-600">
                          ${item.unitPrice.toFixed(2)}
                        </td>

                        {/* Item total — updates immediately on quantity change */}
                        <td className="px-4 py-4 text-right font-semibold text-[#1C274C]">
                          ${item.itemTotal.toFixed(2)}
                        </td>

                        {/* Remove button */}
                        <td className="px-4 py-4">
                          <button
                            onClick={() => removeItem(item.cartItemId)}
                            disabled={updating[item.cartItemId]}
                            className="text-red-400 hover:text-red-600 disabled:opacity-40"
                            title="Remove"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <button
                    disabled={page <= 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-100 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Continue shopping */}
              <div className="mt-6">
                <Link to="/explore">
                  <button className="text-sm text-blue-600 hover:underline">
                    ← Continue Shopping
                  </button>
                </Link>
              </div>
            </div>

            {/* ── Order Summary ──────────────────────────────────── */}
            <div className="lg:w-72 w-full">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-[#1C274C] mb-4">Order Summary</h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Items ({totalCount})</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (13%)</span>
                    <span>${(grandTotal * 0.13).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between font-bold text-[#1C274C] text-base">
                    <span>Total</span>
                    <span>${(grandTotal * 1.13).toFixed(2)}</span>
                  </div>
                </div>

                <button
  onClick={handleCheckout}
  disabled={checkingOut || items.length === 0}
  className="w-full mt-6 bg-[#1C274C] hover:bg-blue-900 text-white py-3 rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
>
  {checkingOut ? (
    <span className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
      Placing Order...
    </span>
  ) : "Proceed to Checkout"}
</button>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Prices shown in USD · Tax included at checkout
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </>
  );
}