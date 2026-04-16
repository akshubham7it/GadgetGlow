import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Toaster, toast } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

const schema = z.object({
  code: z.string().min(1, "Code is required"),
  discount_type: z.enum(["percentage", "amount"]),
  discountValue: z.number().min(1, "Discount Value must be greater than 0"),
  isActive: z.boolean(),
  expire_after: z.string().min(1, "Date Expired is required"),
});

type FormValues = z.infer<typeof schema>;

export default function CouponsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    code: "",
    discount_type: "percentage",
    discountValue: 0,
    isActive: true,
    expire_after: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/coupon/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.status === 200 && data.coupon) {
          setFormValues({
            code: data.coupon.code || "",
            discount_type: data.coupon.discount_type || "percentage",
            discountValue: Number(data.coupon.discount_value) || 0,
            isActive: data.coupon.is_active ?? true,
            expire_after: data.coupon.expire_after || "",
          });
        } else {
          toast.error("Failed to load coupon details.");
        }
      } catch {
        toast.error("Something went wrong!");
      }
    };

    if (id) {
      fetchCoupon();
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "discountValue"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      schema.parse(formValues);
      setFormErrors({});
      setIsSubmitting(true);

      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/coupon/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: formValues.code,
          discount_type: formValues.discount_type,
          discount_value: formValues.discountValue,
          is_active: formValues.isActive,
          expire_after: formValues.expire_after,
        }),
      });

      const result = await response.json();

      if (response.status === 200) {
        toast.success(result.msg || "Coupon updated successfully");
        setTimeout(() => {
          navigate("/admin/coupon", { state: "refresh" });
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
        <p className="text-[#0a0a0a] text-xl">Edit Coupon</p>
        <button
          onClick={() => navigate("/admin/coupons")}
          className="flex items-center gap-2 border border-solid py-1 px-3 rounded-lg hover:bg-green-700 hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Coupons
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md max-w-screen">
        <div className="flex flex-col ml-4 gap-6">
          <div className="flex flex-col gap-2">
            <label>Code *</label>
            <input
              type="text"
              name="code"
              value={formValues.code}
              onChange={handleChange}
              className="w-[36rem] rounded-md border px-3 py-2"
              placeholder="Coupon Code"
            />
            {formErrors.code && <p className="text-red-500 text-sm">{formErrors.code}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label>Discount Type *</label>
            <select
              name="discount_type"
              value={formValues.discount_type}
              onChange={handleChange}
              className="w-[36rem] rounded-md border px-3 py-2"
            >
              <option value="percentage">Percent</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label>Discount Value *</label>
            <input
              type="number"
              name="discountValue"
              value={formValues.discountValue}
              onChange={handleChange}
              className="w-[36rem] rounded-md border px-3 py-2"
              placeholder="Discount Value"
            />
            {formErrors.discountValue && (
              <p className="text-red-500 text-sm">{formErrors.discountValue}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label>Expiry Date *</label>
            <input
              type="text"
              name="expire_after"
              value={formValues.expire_after}
              onChange={handleChange}
              className="w-[36rem] rounded-md border px-3 py-2"
            />
            {formErrors.expire_after && (
              <p className="text-red-500 text-sm">{formErrors.expire_after}</p>
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
