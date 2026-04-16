import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  email: z.string().email("This is not a valid email format!"),
  password: z.string().min(1, "Password field cannot be empty"),
});

type FormErrors = {
  email?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

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

      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        if (result.token) {
          Cookies.set("token", result.token);
          localStorage.setItem("token", result.token);
          toast.success(result.msg);
          setTimeout(() => {
            navigate("/");
          }, 500);
        } else {
          toast.error("No token found!");
        }
      } else {
        const errorMessage = result.msg || result.error || "Server error!";
        toast.error(errorMessage);
      }
    } catch (err) {
      setLoading(false);
      const errors: FormErrors = {};
      if (err instanceof z.ZodError) {
        err.issues.forEach((error) => {
          errors[error.path[0] as keyof FormErrors] = error.message;
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
            <p className="text-blue-900 font-bold text-2xl">
              Sign In to Your Account
            </p>
            <p className="text-sm text-gray-500">Enter your detail below</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-8">
              <label className="block py-3 text-gray-500">Email</label>
              <input
                name="email"
                className="bg-gray-100 w-full rounded-md px-3 py-1"
                type="email"
                placeholder="example@gmail.com"
                value={formValues.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="px-8">
              <label className="block py-3 text-gray-500">Password</label>
              <input
                name="password"
                className="bg-gray-100 w-full rounded-md px-3 py-1"
                type="password"
                placeholder="Enter Your Password"
                value={formValues.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>

            <div className="px-8 py-4">
              <button
                type="submit"
                className="bg-blue-950 text-white w-full py-1.5 rounded-md hover:bg-violet-800 flex justify-center items-center gap-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-20"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-100"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
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
              <p className="text-sm text-gray-500 hover:text-blue-500">
                Forgot your password?
              </p>
            </Link>
            <p className="text-sm text-gray-500 py-3">Or</p>
          </div>

          <div className="px-8 py-2">
            <button className="bg-gray-200 text-gray-700 w-full py-1.5 rounded-md hover:bg-gray-100 flex items-center justify-center gap-3">
              <img className="w-7 h-6" src="google.jpg" alt="Google" />
              <a
                href="https://myaccount.google.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign in with Google
              </a>
            </button>
          </div>

          <div className="px-8 py-2">
            <button className="bg-gray-200 text-gray-700 w-full py-1.5 rounded-md hover:bg-gray-100 flex items-center justify-center gap-3">
              <img className="w-8 h-6" src="github.jpg" alt="Github" />
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign in with GitHub
              </a>
            </button>
          </div>

          <div className="text-sm text-center px-8 pt-4">
            <p className="text-gray-500 inline">Don't have an account?</p>
            <Link
              to="/signup"
              className="text-blue-800 hover:text-blue-500 font-semibold px-1"
            >
              Sign up Now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
