import { useState, FormEvent, ChangeEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

export default function BrandsCreate() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialValues: FormValues = {
    name: "",
    description: "",
    isActive: true,
  };

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});
  const [brandImage, setBrandImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBrandImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      schema.parse(formValues);
      setFormErrors({});
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("is_active", String(formValues.isActive));
      if (brandImage) {
        formData.append("image", brandImage);
      }

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/brand`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.msg || "Brand created successfully");
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
        <p className="text-[#0a0a0a] text-xl">Create Brand</p>
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

          <div className="flex flex-col gap-2">
            <label>Image</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-[36rem] h-40 cursor-pointer border-2 rounded-md flex justify-center items-center hover:border-green-700"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full object-contain"
                />
              ) : (
                <img
                  src="/upload.svg"
                  alt="Upload Icon"
                  className="w-12 h-12 opacity-60"
                />
              )}
            </div>
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
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
