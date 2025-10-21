import { FaCartPlus, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { toast } from "react-toastify";
import { useState } from "react";
import { RingLoader } from "react-spinners";
import { FaCheckDouble } from "react-icons/fa6";

const ProductCard = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State for success message
  const navigate = useNavigate();
  const quantity = 1;
  const productId = item._id;

  // Truncate title after a few words (e.g., 5 words)
  const truncateTitle = (title, wordLimit = 5) => {
    const words = title.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : title;
  };

  // Function to handle adding the product to the cart
  const handleAddToCart = async () => {
    try {
      setLoading(true); // Start loading
      const response = await addToCart(productId, quantity);

      if (response.success) {
        setSuccess(true); // Set success state
        setLoading(false); // Stop loading
        setTimeout(() => setSuccess(false), 5000); // Clear success message after 3 seconds
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Check if the error is due to the user not being logged in
      if (
        error === "You are not logged in. Please login or register." ||
        error === "Invalid or expired token. Please login again."
      ) {
        toast.error("Please log in to add items to your cart.");
        navigate("/login"); // Redirect to the login page
      } else {
        toast.error(error);
      }
      setLoading(false); // Stop loading in case of error
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-col items-center relative group">
      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {/* Image with hover effect */}
      <div className="relative w-full h-56">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover rounded-lg transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

        {/* Icons appear on hover */}
        <div className="absolute right-3 top-7 flex flex-col gap-x-2 gap-y-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`bg-white text-gray-600 p-3 rounded-lg hover:bg-[#ffd90c] relative ${
              success
                ? "bg-[#2fba6b] hover:bg-[#2fba6b] text-white"
                : "hover:bg-[#ffd90c]"
            }`}
          >
            {success ? <FaCheckDouble size={20} /> : <FaCartPlus size={20} />}
          </button>

          {/* Quick View Button */}
          <Link to={`/product/${item._id}`}>
            <button className="bg-white text-gray-600 p-3 rounded-lg hover:bg-[#ffd90c] relative">
              <FaRegEye size={20} />
            </button>
          </Link>
        </div>
      </div>

      <Link to={`/product/${item._id}`}>
        <div className="p-4 flex items-center flex-col">
          <h3 className="mt-2 font-semibold text-md tracking-tight text-gray-900">
            {truncateTitle(item.name, 5)}
          </h3>
          <p className="text-gray-700 font-bold">
            Ksh. {Number(item.price).toLocaleString()}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
