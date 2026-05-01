import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  name:      z.string().min(1, "Name is required"),
  email:     z.string().email("Invalid email format"),
  password:  z.string().min(8, "Password must be at least 8 characters"),
  phone:     z.string().min(10, "Phone must be valid"),
  phone_code: z.string().min(1),
  role:      z.string().min(1, "Role is required"),
  address:   z.string().min(1, "Address is required"),
  status:    z.string().min(1, "Status is required"),
});

type FormValues = z.infer<typeof schema>;

export default function UsersCreate() {
  const navigate = useNavigate();
  const token    = localStorage.getItem("token") || "";

  const [formValues, setFormValues] = useState<FormValues>({
    name:       "",
    email:      "",
    password:   "",
    phone:      "",
    phone_code: "+977",
    role:       "",
    address:    "",
    status:     "Approved",
  });
  const [formErrors,   setFormErrors]   = useState<Partial<Record<keyof FormValues, string>>>({});
  const [roleOpen,     setRoleOpen]     = useState(false);
  const [statusOpen,   setStatusOpen]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin can assign any role including "admin"
  const roles    = ["admin", "seller", "buyer"];
  const statuses = ["Approved", "Pending", "Suspended"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formValues);
      setFormErrors({});
      setIsSubmitting(true);

      // ✅ Correct endpoint: POST /api/admin/users
      const response = await fetch(`${API_URL}/admin/users`, {
        method:  "POST",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          name:      formValues.name,
          email:     formValues.email,
          password:  formValues.password,
          phone:     formValues.phone,
          phoneCode: formValues.phone_code,
          address:   formValues.address,
          role:      formValues.role,    // "admin" | "seller" | "buyer"
          status:    formValues.status,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg || "User created successfully");
        setTimeout(() => navigate("/admin/users"), 600);
      } else {
        toast.error(result.msg || "Something went wrong");
      }
    } catch (err: any) {
      const errors: Partial<Record<keyof FormValues, string>> = {};
      err.errors?.forEach((e: any) => {
        errors[e.path[0] as keyof FormValues] = e.message;
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
        <p className="text-[#0a0a0a] text-xl font-semibold">Create User</p>
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-2 border py-1 px-3 rounded-lg hover:bg-green-700 hover:text-white text-sm"
        >
          <ArrowLeft size={18} />
          Back to Users
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md max-w-lg">
        <div className="flex flex-col gap-5">

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text" name="name" value={formValues.name} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Full Name"
            />
            {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email" name="email" value={formValues.email} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="user@example.com"
            />
            {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password *</label>
            <input
              type="password" name="password" value={formValues.password} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Min 8 characters"
            />
            {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Phone *</label>
            <input
              type="text" name="phone" value={formValues.phone} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="98XXXXXXXX"
            />
            {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Address *</label>
            <input
              type="text" name="address" value={formValues.address} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="City, Street"
            />
            {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
          </div>

          {/* Role dropdown — includes admin */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium">Role *</label>
            <button
              type="button"
              onClick={() => { setRoleOpen(!roleOpen); setStatusOpen(false); }}
              className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm"
            >
              <span className={formValues.role ? "capitalize text-gray-800" : "text-gray-400"}>
                {formValues.role || "Select Role"}
              </span>
              <ChevronDown size={18} />
            </button>
            {roleOpen && (
              <ul className="absolute top-16 z-10 w-full border bg-white rounded-md shadow-md">
                {roles.map((r) => (
                  <li
                    key={r}
                    onClick={() => { setFormValues((p) => ({ ...p, role: r })); setRoleOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize text-sm"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            )}
            {formErrors.role && <p className="text-red-500 text-xs">{formErrors.role}</p>}
            <p className="text-xs text-gray-400">
              Admin: full dashboard access. Seller: can post products. Buyer: can purchase & review.
            </p>
          </div>

          {/* Status dropdown */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium">Status *</label>
            <button
              type="button"
              onClick={() => { setStatusOpen(!statusOpen); setRoleOpen(false); }}
              className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm"
            >
              <span className={formValues.status ? "text-gray-800" : "text-gray-400"}>
                {formValues.status || "Select Status"}
              </span>
              <ChevronDown size={18} />
            </button>
            {statusOpen && (
              <ul className="absolute top-16 z-10 w-full border bg-white rounded-md shadow-md">
                {statuses.map((s) => (
                  <li
                    key={s}
                    onClick={() => { setFormValues((p) => ({ ...p, status: s })); setStatusOpen(false); }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white bg-[#076A41] py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 text-sm font-medium"
          >
            {isSubmitting ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}