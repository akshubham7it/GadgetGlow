import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_USER_API_URL;

interface ProductDetailDto {
  id: number;
  name: string;
  description: string;
}

interface ReviewDto {
  id: number;
  comment: string;
  rating: number;
  createdAt: string;
  userId: number;
  userName: string;
  userImage: string;
  productId: number;
  productName: string;
}

export default function Description() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState<ProductDetailDto | null>(null);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Template form state (no POST)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "", name: "", email: "" });

  // Fetch product description
  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const res = await fetch(`${API_URL}/product/${id}`);
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        console.error("Failed to fetch description", err);
      }
    };
    if (id) fetchDescription();
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setReviewsLoading(true);
      try {
        const res = await fetch(`${API_URL}/review?productId=${id}`);
        const data = await res.json();
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setReviewsLoading(false);
      }
    };
    if (id) fetchReviews();
  }, [id]);

  const showRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full ${i}`} size={16} fill="yellow" stroke="yellow" />);
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4 overflow-hidden">
          <Star size={16} fill="gray" stroke="gray" className="absolute" />
          <div className="absolute w-[50%] h-full overflow-hidden">
            <Star size={16} fill="yellow" stroke="yellow" />
          </div>
        </div>
      );
    }
    while (stars.length < 5) {
      stars.push(<Star key={`empty ${stars.length}`} size={16} fill="gray" stroke="gray" />);
    }
    return stars.slice(0, 5);
  };

  const showInteractiveRating = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={20}
        fill={star <= newReview.rating ? "yellow" : "gray"}
        stroke={star <= newReview.rating ? "yellow" : "gray"}
        className="cursor-pointer"
        onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
      />
    ));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-gray-100">
      <div className="max-w-[1170px] mx-auto px-5 py-16">
        {/* Tabs */}
        <div className="flex items-center bg-white border border-gray-200 rounded px-4 py-2 text-xl h-16 flex-grow text-[#1C274C]">
          <button
            onClick={() => setActiveTab("description")}
            className={`font-semibold px-4 hover:underline hover:text-blue-500 ${activeTab === "description" ? "underline text-blue-500" : ""}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("additional")}
            className={`font-semibold px-4 hover:underline hover:text-blue-500 ${activeTab === "additional" ? "underline text-blue-500" : ""}`}
          >
            Additional Information
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`font-semibold px-4 hover:underline hover:text-blue-500 ${activeTab === "reviews" ? "underline text-blue-500" : ""}`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className={`mt-12 ${activeTab === "description" ? "" : "hidden"}`}>
          <h1 className="text-[#1C274C] text-2xl font-semibold">Specifications:</h1>
          <p className="text-[#606882] max-w-[50%]">{product?.description || "Loading..."}</p>
        </div>

        <div className={`py-16 ${activeTab === "additional" ? "" : "hidden"}`}>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-6 text-md flex-grow text-[#606882]">
            No additional information available!
          </div>
        </div>

        <div className={`flex-col lg:flex-row items-start justify-between text-[#1C274C] gap-10 mt-12 ${activeTab === "reviews" ? "flex" : "hidden"}`}>
          <div className="flex-1 min-w-[300px]">
            <div className="text-2xl font-semibold mb-6">
              {reviews.length} Review{reviews.length !== 1 ? "s" : ""} for this Product
            </div>

            {reviewsLoading ? (
              <div className="flex justify-center py-10">
                <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-[#606882]">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="flex flex-col gap-5 max-w-[520px]">
                {reviews.map((review) => (
                  <div key={review.id} className="px-2">
                    <div className="bg-white rounded-2xl shadow-sm border p-6 h-auto flex flex-col mb-4">
                      <div className="flex justify-between space-x-1 mb-3">
                        <div className="flex items-center gap-4 mt-auto">
                          <img
                            src={review.userImage}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/user2.jpg"; }}
                          />
                          <div>
                            <p className="text-[#1C274C] font-semibold text-sm">{review.userName}</p>
                            <p className="text-[#606882] text-xs">
                              {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-1 mt-1">{showRating(review.rating)}</div>
                      </div>
                      <p className="text-[#1C274C] text-sm">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Template Add Review Form */}
          <div className="flex-1 min-w-[300px]">
            <div className="text-2xl font-semibold mb-6">Add a Review</div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[#606882]">
                  Your email address will not be published. Required fields are marked *
                </p>
              </div>

              <div className="flex gap-2">
                <p>Your Rating* :</p>
                <div className="flex space-x-1 mt-1">{showInteractiveRating()}</div>
              </div>

              <form onSubmit={handleSubmitReview}>
                <div className="bg-white rounded-2xl shadow-sm border p-6 w-full h-auto flex flex-col mb-8 gap-3">
                  <p className="text-[#606882]">Comment</p>
                  <textarea
                    className="px-3 py-3 border w-full min-h-40 border-gray-200"
                    placeholder="Your Review Here"
                    value={newReview.comment}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                    maxLength={250}
                  />
                  <div className="flex justify-between text-[#8D93A5]">
                    <p>Maximum</p>
                    <p>{newReview.comment.length}/250</p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-start text-[#606882] gap-4">
                    <div className="flex-1">
                      <p>Name*</p>
                      <input
                        className="mt-3 border px-5 h-10 rounded-sm w-full"
                        placeholder="Your name"
                        type="text"
                        value={newReview.name}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="flex-1">
                      <p>Email*</p>
                      <input
                        className="mt-3 border px-5 h-10 rounded-sm w-full"
                        placeholder="Your email"
                        type="text"
                        value={newReview.email}
                        onChange={(e) => setNewReview((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="mt-3 bg-[#3C50E0] text-white py-2 px-2 w-36 h-10 sm:w-32 hover:bg-blue-950 rounded-lg"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}