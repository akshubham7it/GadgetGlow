import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  email:    z.string().email("This is not a valid email format!"),
  password: z.string().min(1, "Password field cannot be empty"),
});

type FormErrors = { email?: string; password?: string };

export default function Login() {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading,    setLoading]    = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      schema.parse(formValues);
      setFormErrors({});
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email: formValues.email, password: formValues.password }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        // Save token + full user object to AuthContext → Header updates immediately
        login(result.token, result.user);
        toast.success(result.message || "Login successful!");
        setTimeout(() => navigate("/"), 500);
      } else {
        toast.error(result.msg || result.message || "Invalid email or password");
      }
    } catch (err) {
      setLoading(false);
      const errors: FormErrors = {};
      if (err instanceof z.ZodError) {
        err.issues.forEach((e) => {
          errors[e.path[0] as keyof FormErrors] = e.message;
        });
      }
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 py-4">
      <Toaster position="top-center" />
      <div className="max-w-96 mx-auto sm:w-10 lg:w-full py-20">
        <div className="bg-white rounded w-80 md:w-96 py-4 mx-auto">
          <div className="py-8 text-center">
            <p className="text-blue-900 font-bold text-2xl">Sign In to Your Account</p>
            <p className="text-sm text-gray-500">Enter your detail below</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-8">
              <label className="block py-3 text-gray-500">Email</label>
              <input
                name="email" type="email"
                className="bg-gray-100 w-full rounded-md px-3 py-1"
                placeholder="example@gmail.com"
                value={formValues.email} onChange={handleChange}
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>

            <div className="px-8">
              <label className="block py-3 text-gray-500">Password</label>
              <input
                name="password" type="password"
                className="bg-gray-100 w-full rounded-md px-3 py-1"
                placeholder="Enter Your Password"
                value={formValues.password} onChange={handleChange}
              />
              {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
            </div>

            <div className="px-8 py-4">
              <button
                type="submit" disabled={loading}
                className="bg-blue-950 text-white w-full py-1.5 rounded-md hover:bg-violet-800 flex justify-center items-center gap-2 disabled:bg-gray-400"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    <span className="text-white font-medium">Signing In...</span>
                  </div>
                ) : (
                  <span className="font-semibold text-white">Sign In</span>
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/forgot">
              <p className="text-sm text-gray-500 hover:text-blue-500">Forgot your password?</p>
            </Link>
          </div>

          
          <div className="text-sm text-center px-8 pt-4">
            <p className="text-gray-500 inline">Don't have an account?</p>
            <Link to="/signup" className="text-blue-800 hover:text-blue-500 font-semibold px-1">
              Sign up Now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}