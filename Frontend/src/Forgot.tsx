import { useState, type ChangeEvent, type FormEvent } from "react";
// import { Link } from "react-router-dom";
import { z } from "zod";
import { user } from "./constants/product";

const schema = z.object({
  email: z.string().email("This is not a valid email format!"),
});

type FormValues = {
  email: string;
};

type FormErrors = {
  email?: string;
};

export default function Forgot() {
  const initialValues: FormValues = { email: "" };
  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(formValues);
      setFormErrors({});
      const exists = user.some(u => u.email === formValues.email);
      if (exists) {
        alert("Reset email sent successfully!");
      } else {
        alert("Your email ID is not registered.");
      }
    } catch (error: any) {
      const errors: FormErrors = {};
      if (error.errors) {
        error.errors.forEach((err: any) => {
          if (err.path && err.path[0]) {
            errors[err.path[0]] = err.message;
          }
        });
      }
      setFormErrors(errors);
    }
  };

  return (
    <div className="mx-auto  ">
      <div className="max-w-7xl mx-auto"></div>
      <div className="h-screen w-screen bg-gray-200 py-4">
        <div className="max-w-96 mx-auto w-full py-20">
          <div className="bg-white rounded space-y-1">
            <div className="py-8">
              <p className="text-blue-900 font-bold text-center text-2xl">Forgot Password</p>
              <p className="text-center text-sm text-gray-500">Enter your email below</p>
            </div>

            <form onSubmit={handleSubmit}>
              <p className="px-8 py-3 text-gray-500">Email</p>
              <div className="px-8">
                <input
                  name="email"
                  className="bg-gray-100 border-gray flex grow w-full rounded-md px-3 py-1"
                  type="text"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs">{formErrors.email}</p>
                )}
              </div>

              <div className="px-8 py-4">
                <button className="bg-blue-950 text-white w-80 py-1.5 rounded-md hover:bg-violet-800">Send Email</button>
              </div>
            </form>

            <div className="py-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
