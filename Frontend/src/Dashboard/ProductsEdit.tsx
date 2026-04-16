import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  user: z.string().min(1, "User is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.coerce.number().min(0, "Price is required"),
  discountedPrice: z.coerce.number().min(0, "Discounted price is required"),
  quantity: z.coerce.number().min(0, "Quantity is required"),
  color: z.string().min(1, "Color is required"),
});

type FormValues = z.infer<typeof schema>;

type User = { id: string; name: string };
type Brand = { id: string; name: string };

export default function ProductsEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    user: "",
    brand: "",
    price: 0,
    discountedPrice: 0,
    quantity: 0,
    color: "",
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [dropdownOpen, setDropdownOpen] = useState<"user" | "brand" | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [userRes, brandRes] = await Promise.all([
          fetch(`${API_URL}/user`),
          fetch(`${API_URL}/brand`),
        ]);
        const [userData, brandData] = await Promise.all([userRes.json(), brandRes.json()]);
        setUsers(Array.isArray(userData.users) ? userData.users : []);
        setBrands(Array.isArray(brandData.brands) ? brandData.brands : []);
      } catch {
        toast.error("Failed to load dropdown data");
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const response = await fetch(`${API_URL}/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        const p = data.product;
        setFormValues({
          name: p.name || "",
          user: p.userId || p.user || "",
          brand: p.brandId || p.brand || "",
          price: p.price || 0,
          discountedPrice: p.discountedPrice || 0,
          quantity: p.quantity || 0,
          color: p.color || "",
        });
      } catch {
        toast.error("Failed to load product details");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (key: "user" | "brand", value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setDropdownOpen(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const parsed = schema.parse(formValues);
      setFormErrors({});
      setIsSubmitting(true);
      const token = localStorage.getItem("token") || "";
      const response = await fetch(`${API_URL}/product/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: parsed.name,
          userId: parsed.user,
          brandId: parsed.brand,
          price: parsed.price,
          discountedPrice: parsed.discountedPrice,
          quantity: parsed.quantity,
          color: parsed.color,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg || "Product updated successfully");
        setTimeout(() => navigate("/admin/products", { state: "refresh" }), 500);
      } else {
        toast.error(result.msg || "Something went wrong");
      }
    } catch (err: any) {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      err.errors?.forEach((error: any) => {
        errors[error.path[0] as keyof FormValues] = error.message;
      });
      setFormErrors(errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#f5f5f5]">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#0a0a0a] text-xl">Edit Product</p>
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 border border-solid py-1 px-3 rounded-lg hover:bg-green-700 hover:text-white"
          type="button"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md max-w-screen">
        <div className="flex flex-col ml-4 gap-6">
          <div className="flex flex-col gap-2">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="Product Name"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label>User *</label>
            <button
              type="button"
              onClick={() => setDropdownOpen(dropdownOpen === "user" ? null : "user")}
              className="w-96 flex justify-between items-center border rounded-md px-3 py-2"
            >
              {users.find((u) => u.id === formValues.user)?.name || "Select User"}
              <ChevronDown size={18} />
            </button>
            {dropdownOpen === "user" && (
              <ul className="absolute top-20 z-10 w-96 border bg-white rounded-md shadow-md max-h-40 overflow-auto">
                {users.map((u) => (
                  <li
                    key={u.id}
                    onClick={() => handleSelect("user", u.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {u.name}
                  </li>
                ))}
              </ul>
            )}
            {formErrors.user && <p className="text-red-500 text-sm">{formErrors.user}</p>}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label>Brand *</label>
            <button
              type="button"
              onClick={() => setDropdownOpen(dropdownOpen === "brand" ? null : "brand")}
              className="w-96 flex justify-between items-center border rounded-md px-3 py-2"
            >
              {brands.find((b) => b.id === formValues.brand)?.name || "Select Brand"}
              <ChevronDown size={18} />
            </button>
            {dropdownOpen === "brand" && (
              <ul className="absolute top-20 z-10 w-96 border bg-white rounded-md shadow-md max-h-40 overflow-auto">
                {brands.map((b) => (
                  <li
                    key={b.id}
                    onClick={() => handleSelect("brand", b.id)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {b.name}
                  </li>
                ))}
              </ul>
            )}
            {formErrors.brand && <p className="text-red-500 text-sm">{formErrors.brand}</p>}
          </div>
          
          <div className="flex flex-col gap-2">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="Enter product price"
            />
            {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Discounted Price *</label>
            <input
              type="number"
              name="discountedPrice"
              value={formValues.discountedPrice}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="Enter discounted price"
            />
            {formErrors.discountedPrice && <p className="text-red-500 text-sm">{formErrors.discountedPrice}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formValues.quantity}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="Enter quantity"
            />
            {formErrors.quantity && <p className="text-red-500 text-sm">{formErrors.quantity}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label>Color *</label>
            <input
              type="text"
              name="color"
              value={formValues.color}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="Enter color"
            />
            {formErrors.color && <p className="text-red-500 text-sm">{formErrors.color}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-96 text-white bg-[#076A41] py-2 rounded-md hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
