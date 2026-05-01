import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

// Validation — same fields as original form, roles via checkboxes
const schema = z
  .object({
    fname:      z.string().min(1, "Full Name is required!"),
    email:      z.string().email("This is not a valid email format!"),
    password:   z.string().min(8, "Password must be more than 8 characters"),
    repassword: z.string().min(1, "Re-type your password"),
    address:    z.string().min(1, "Address is required!"),
    phone:      z.string().min(10, "Must be a valid mobile number").max(14),
    isBuyer:    z.boolean(),
    isSeller:   z.boolean(),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords are not matching",
    path: ["repassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignUp() {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [formValues, setFormValues] = useState<FormValues>({
    fname:      "",
    email:      "",
    password:   "",
    repassword: "",
    address:    "",
    phone:      "",
    isBuyer:    false,
    isSeller:   false,
  });

  const [formErrors,    setFormErrors]    = useState<Partial<Record<keyof FormValues, string>>>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [loading,       setLoading]       = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formValues);
      setFormErrors({});
      setLoading(true);

      
      const neitherChecked = !formValues.isBuyer && !formValues.isSeller;

      const payload = {
        name:      formValues.fname,
        email:     formValues.email,
        password:  formValues.password,
        address:   formValues.address,
        phone:     formValues.phone,
        phoneCode: "+977",
        isBuyer:   neitherChecked ? false : formValues.isBuyer,
        isSeller:  neitherChecked ? false : formValues.isSeller,
        isAdmin:   neitherChecked,   
      };

      const response = await fetch(`${API_URL}/auth/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        // Save to AuthContext → updates Header immediately
        login(result.token, result.user);
        toast.success("Account created successfully!");
        setStatusMessage("Account created successfully!");
        setTimeout(() => navigate("/"), 600);
      } else {
        toast.error(result.msg || "Something went wrong!");
        setStatusMessage(result.msg || "Something went wrong!");
      }
    } catch (err: any) {
      setLoading(false);
      const errors: Partial<Record<keyof FormValues, string>> = {};
      err.errors?.forEach((error: any) => {
        errors[error.path[0] as keyof FormValues] = error.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <Toaster position="top-center" />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Create an Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">Enter your details below</p>

        

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 text-sm text-[#606882]">

            <div>
              <label>Full Name *</label>
              <input
                type="text" name="fname" value={formValues.fname} onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.fname && <p className="text-red-500 text-xs">{formErrors.fname}</p>}
            </div>

            <div>
              <label>Email Address *</label>
              <input
                type="email" name="email" value={formValues.email} onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
            </div>

            <div>
              <label>Address *</label>
              <input
                type="text" name="address" value={formValues.address} onChange={handleChange}
                placeholder="123 Main Street, City"
                className="w-full px-3 mt-2 py-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.address && <p className="text-red-500 text-xs">{formErrors.address}</p>}
            </div>

            <div>
              <label>Phone Number *</label>
              <input
                type="text" name="phone" value={formValues.phone} onChange={handleChange}
                placeholder="9800000000"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.phone && <p className="text-red-500 text-xs">{formErrors.phone}</p>}
            </div>

            <div>
              <label>Password *</label>
              <input
                type="password" name="password" value={formValues.password} onChange={handleChange}
                placeholder="Min 8 characters"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.password && <p className="text-red-500 text-xs">{formErrors.password}</p>}
            </div>

            <div>
              <label>Re-type Password *</label>
              <input
                type="password" name="repassword" value={formValues.repassword} onChange={handleChange}
                placeholder="Repeat password"
                className="w-full px-3 mt-2 py-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.repassword && <p className="text-red-500 text-xs">{formErrors.repassword}</p>}
            </div>

            {/* ── Role Selection ──────────────────────────────────── */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              <label className="block mb-3 font-medium text-gray-700">
                Register as:
              </label>
              <div className="flex gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox" name="isBuyer"
                    checked={formValues.isBuyer} onChange={handleChange}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-gray-700 font-medium">Buyer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox" name="isSeller"
                    checked={formValues.isSeller} onChange={handleChange}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-gray-700 font-medium">Seller</span>
                </label>
              </div>
              
            </div>

          </div>

          {statusMessage && (
            <p className={`text-center mt-3 text-sm ${
              statusMessage.startsWith("Account") ? "text-green-600" : "text-red-500"
            }`}>
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                Creating account...
              </>
            ) : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-semibold">Sign in Now!</Link>
        </div>
      </div>
    </div>
  );
}