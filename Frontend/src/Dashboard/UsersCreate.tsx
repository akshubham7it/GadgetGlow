import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().min(10, "Phone must be valid"),
  phone_code: z.string().min(1),
  role: z.string().min(1, "Role is required"),
  address: z.string().min(1, "Address is required"),
});

type FormValues = z.infer<typeof schema>;

export default function UsersCreate() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    phone: "",
    phone_code: "+977",
    role: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = ["admin", "buyer", "seller"];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleRoleSelect = (role: string) => {
    setFormValues({ ...formValues, role });
    setDropdownOpen(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formValues);
      setFormErrors({});
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.msg || "User created successfully");
        setTimeout(() => {
          navigate("/admin/users");
        }, 500);
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
        <p className="text-[#0a0a0a] text-xl">Create User</p>
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center gap-2 border border-solid py-1 px-3 rounded-lg hover:bg-green-700 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Users
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
              placeholder="User Name"
            />
            {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="User Email"
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="Enter Password"
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Phone *</label>
            <div className="flex items-center gap-2">
              
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                className="w-80 rounded-md border px-3 py-2"
                placeholder="98XXXXXXXX"
              />
            </div>
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formValues.address}
              onChange={handleChange}
              className="w-96 rounded-md border px-3 py-2"
              placeholder="Address"
            />
            {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
          </div>

          <div className="flex flex-col gap-2 relative">
            <label>Role *</label>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-96 flex justify-between items-center border rounded-md px-3 py-2"
            >
              {formValues.role || "Select Role"}
              <ChevronDown size={18} />
            </button>
            {dropdownOpen && (
              <ul className="absolute top-20 z-10 w-96 border bg-white rounded-md shadow-md">
                {roles.map((role) => (
                  <li
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {role}
                  </li>
                ))}
              </ul>
            )}
            {formErrors.role && <p className="text-red-500 text-sm">{formErrors.role}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-96 text-white bg-[#076A41] py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
