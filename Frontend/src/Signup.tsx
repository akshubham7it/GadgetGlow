import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z
  .object({
    fname: z.string().min(1, "Full Name is required!"),
    email: z.string().email("This is not a valid email format!"),
    password: z.string().min(8, "Password must be more than 8 characters"),
    repassword: z.string().min(1, "Re-type your password"),
    address: z.string().min(1, "Address is required!"),
    phone: z
      .string()
      .min(10, { message: "Must be a valid mobile number" })
      .max(14),
    role: z.string().min(1),
  })
  .refine((data) => data.password === data.repassword, {
    message: "Passwords are not matching",
    path: ["repassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignUp() {
  const navigate = useNavigate();

  const initialValues: FormValues = {
    fname: "",
    email: "",
    password: "",
    repassword: "",
    address: "",
    phone: "",
    role: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      schema.parse(formValues);
      setFormErrors({});

      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formValues.fname,
          email: formValues.email,
          password: formValues.password,
          address: formValues.address,
          phone: formValues.phone,
          role: formValues.role,
          phone_code: "+977",
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.msg);
        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        toast.error(result.msg || "Something went wrong!");
        setStatusMessage(result.msg || "Something went wrong!");
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
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <Toaster position="top-center" />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-2">
          Create an Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your details below
        </p>

        <div className="space-y-4">
          <a
            href="https://myaccount.google.com/"
            target="_blank"
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-100 py-2 rounded-lg"
          >
            <img src="google.jpg" alt="Google" className="w-6 h-6 mr-2" />
            Sign up with Google
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            className="flex items-center justify-center bg-gray-200 hover:bg-gray-100 py-2 rounded-lg"
          >
            <img src="github.jpg" alt="GitHub" className="w-8 h-6 mr-2" />
            Sign up with GitHub
          </a>
        </div>

        <div className="text-center text-gray-500 font-semibold my-4">Or</div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 text-sm text-[#606882]">
            <div>
              <label>Full Name *</label>
              <input
                type="text"
                name="fname"
                value={formValues.fname}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.fname && (
                <p className="text-red-500 text-xs">{formErrors.fname}</p>
              )}
            </div>

            <div>
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleChange}
                placeholder="123 Main Street, City"
                className="w-full px-3 mt-2 py-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.address && (
                <p className="text-red-500 text-xs">{formErrors.address}</p>
              )}
            </div>

            <div>
              <label>Role *</label>
              <input
                type="text"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                placeholder="Admin"
                className="w-full px-3 mt-2 py-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.role && (
                <p className="text-red-500 text-xs">{formErrors.role}</p>
              )}
            </div>

            <div>
              <label>Phone Number *</label>
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                placeholder="9800000000"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs">{formErrors.phone}</p>
              )}
            </div>

            <div>
              <label>Password *</label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-3 py-2 mt-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs">{formErrors.password}</p>
              )}
            </div>

            <div>
              <label>Re-type Password *</label>
              <input
                type="password"
                name="repassword"
                value={formValues.repassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-3 mt-2 py-2 rounded-lg bg-gray-100 border"
              />
              {formErrors.repassword && (
                <p className="text-red-500 text-xs">
                  {formErrors.repassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-800"
          >
            Create account
          </button>
        </form>

        {statusMessage && (
          <p
            className={`text-center mt-4 text-sm ${
              statusMessage.startsWith("Account")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {statusMessage}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-semibold">
            Sign in Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
