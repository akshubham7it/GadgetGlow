import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft, Plus } from "lucide-react";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description cannot be empty"),
  user: z.string().min(1, "User is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.string().min(1, "Price is required"),
  discountedPrice: z.string().min(1, "Discounted price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  color: z.string().min(1, "Color is required"),
});

type FormValues = z.infer<typeof schema>;

type User = { id: string; name: string };
type Brand = { id: string; name: string };

export default function ProductsCreate() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    description: "",
    user: "",
    brand: "",
    price: "",
    discountedPrice: "",
    quantity: "",
    color: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [dropdownOpen, setDropdownOpen] = useState<"user" | "brand" |  null>(null);

  const [users, setUsers] = useState<User[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [userRes, brandRes] = await Promise.all([
          fetch(`${API_URL}/user`),
          fetch(`${API_URL}/brand`),
        ]);

        const [userData, brandData] = await Promise.all([
          userRes.json(),
          brandRes.json(),
        ]);

        setUsers(Array.isArray(userData.users) ? userData.users : []);
        setBrands(Array.isArray(brandData.brands) ? brandData.brands : []);
      } catch (err) {
        toast.error("Failed to load dropdown data");
      }
    };

    fetchDropdowns();
  }, []);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelect = (key: "user" | "brand" , value: string) => {
    setFormValues({ ...formValues, [key]: value });
    setDropdownOpen(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formValues);
      setFormErrors({});

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("userId", formValues.user);
      formData.append("brandId", formValues.brand);
      formData.append("price", formValues.price);
      formData.append("discountedPrice", formValues.discountedPrice);
      formData.append("quantity", formValues.quantity);
      formData.append("color", formValues.color);

      const file = fileInputRef.current?.files?.[0];
      if (file) {
        formData.append("image", file);
      }

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.msg || "Product saved");
        navigate("/admin/products");
      } else {
        toast.error(result.msg || "Something went wrong");
      }
    } catch (err: any) {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      err.errors?.forEach((error: any) => {
        errors[error.path[0] as keyof FormValues] = error.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#f5f5f5]">
      <Toaster position="top-center" />
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#0a0a0a] text-xl">Create Product</p>
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 border border-solid py-1 px-3 rounded-lg hover:bg-green-700 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md max-w-screen">
        <div className="flex flex-col ml-4 gap-6">
          <div className="flex flex-col gap-2 w-96">
            <label>Product Image</label>
            <div
              className="w-28 h-24 bg-[#f6eded] border border-gray-400 flex items-center justify-center cursor-pointer overflow-hidden rounded-md"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarPreview ? (
                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Plus size={36} className="text-gray-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

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
              {users.find(u => u.id === formValues.user)?.name || "Select User"}
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
              {brands.find(b => b.id === formValues.brand)?.name || "Select Brand"}
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
            <label>Description *</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="w-96 h-28 rounded-md border px-3 py-2 min-h-20"
              placeholder="Product Description"
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
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
            {formErrors.discountedPrice && (
              <p className="text-red-500 text-sm">{formErrors.discountedPrice}</p>
            )}
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
            {formErrors.quantity && (
              <p className="text-red-500 text-sm">{formErrors.quantity}</p>
            )}
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
            {formErrors.color && (
              <p className="text-red-500 text-sm">{formErrors.color}</p>
            )}
          </div>

          

          <button
            type="submit"
            className="w-96 text-white bg-[#076A41] py-2 rounded-md hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
