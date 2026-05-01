import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";
import { ArrowLeft, ChevronDown } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  name:       z.string().min(1, "Name is required"),
  email:      z.string().email("Invalid email format"),
  password:   z.string().optional(),
  phone:      z.string().min(10, "Phone must be valid"),
  phone_code: z.string().min(1),
  role:       z.string().min(1, "Role is required"),
  address:    z.string().min(1, "Address is required"),
  status:     z.string().min(1, "Status is required"),
});

type FormValues = z.infer<typeof schema>;

export default function UsersEdit() {
  const navigate = useNavigate();
  const { id }   = useParams();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roleOpen,     setRoleOpen]     = useState(false);
  const [statusOpen,   setStatusOpen]   = useState(false);
  const [loading,      setLoading]      = useState(true);

  const roles    = ["admin", "seller", "buyer"];
  const statuses = ["Approved", "Pending", "Suspended"];

  // Prefill form from GET /api/admin/users/{id}
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ Correct endpoint: /api/admin/users/{id}
        const res = await fetch(`${API_URL}/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.user) {
          setFormValues({
            name:       data.user.name       || "",
            email:      data.user.email      || "",
            password:   "",
            phone:      data.user.phone      || "",
            phone_code: data.user.phone_code || "+977",
            role:       data.user.role       || "buyer", // backend sends derived role string
            address:    data.user.address    || "",
            status:     data.user.status     || "Approved",
          });
        } else {
          toast.error(data.msg || "User not found");
          navigate("/admin/users");
        }
      } catch {
        toast.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchUser();
  }, [id]);

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

      const payload: any = {
        name:    formValues.name,
        email:   formValues.email,
        phone:   formValues.phone,
        address: formValues.address,
        role:    formValues.role,
        status:  formValues.status,
      };
      // Only include password if it was filled in
      if (formValues.password && formValues.password.length > 0)
        payload.password = formValues.password;

      // ✅ Correct endpoint: PATCH /api/admin/users/{id}
      const res = await fetch(`${API_URL}/admin/users/${id}`, {
        method:  "PATCH",
        headers: {
          "Content-Type":  "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(result.msg || "User updated successfully");
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <svg className="animate-spin h-8 w-8 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#f5f5f5]">
      <Toaster position="top-center" />

      <div className="flex justify-between items-center mb-6">
        <p className="text-[#0a0a0a] text-xl font-semibold">Edit User</p>
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

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text" name="name" value={formValues.name} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Full Name"
            />
            {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email *</label>
            <input
              type="email" name="email" value={formValues.email} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
            {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              New Password <span className="text-gray-400 font-normal">(leave blank to keep unchanged)</span>
            </label>
            <input
              type="password" name="password" value={formValues.password} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Min 8 characters"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Phone *</label>
            <input
              type="text" name="phone" value={formValues.phone} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm" placeholder="98XXXXXXXX"
            />
            {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Address *</label>
            <input
              type="text" name="address" value={formValues.address} onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 text-sm"
            />
            {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
          </div>

          {/* Role dropdown — includes admin so admin can promote/demote */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium">Role *</label>
            <button
              type="button"
              onClick={() => { setRoleOpen(!roleOpen); setStatusOpen(false); }}
              className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm"
            >
              <span className="capitalize">{formValues.role || "Select Role"}</span>
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
          </div>

          {/* Status dropdown */}
          <div className="flex flex-col gap-1 relative">
            <label className="text-sm font-medium">Status *</label>
            <button
              type="button"
              onClick={() => { setStatusOpen(!statusOpen); setRoleOpen(false); }}
              className="w-full flex justify-between items-center border rounded-md px-3 py-2 text-sm"
            >
              <span>{formValues.status || "Select Status"}</span>
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}