import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function BrandsEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues: FormValues = {
    name: "",
    description: "",
    isActive: true,
  };

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/brand/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.status === 200 && data.brand) {
          setFormValues({
            name: data.brand.name || "",
            description: data.brand.description || "",
            isActive: data.brand.is_active ?? true,
          });
        } else {
          toast.error("Failed to load brand details.");
        }
      } catch {
        toast.error("Something went wrong!");
      }
    };

    if (id) {
      fetchBrand();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/brand/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          name: formValues.name,
          description: formValues.description,
          is_active: formValues.isActive,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.msg || "Brand updated successfully");
        setTimeout(() => {
          navigate("/admin/brands", { state: "refresh" });
        }, 500);
      } else {
        toast.error(result.msg || "Something went wrong!");
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
        <p className="text-[#0a0a0a] text-xl">Edit Brand</p>
        <button
          onClick={() => navigate("/admin/brands")}
          className="flex items-center gap-2 border border-solid py-1 px-3 rounded-lg hover:bg-green-700 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Brands
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md max-w-screen"
      >
        <div className="flex flex-col ml-4 gap-6">
          <div className="flex flex-col gap-2">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-[36rem] rounded-md border px-3 py-2"
              placeholder="Brand Name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Description *</label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="w-[36rem] h-28 rounded-md border px-3 py-2 resize-none"
              placeholder="Brand Description"
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="isActive"
              type="checkbox"
              name="isActive"
              checked={formValues.isActive}
              onChange={handleChange}
              className="w-4 h-4 accent-[#076A41]"
            />
            <label htmlFor="isActive" className="text-sm">
              Active
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[36rem] text-white bg-[#076A41] py-2 rounded-md hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
