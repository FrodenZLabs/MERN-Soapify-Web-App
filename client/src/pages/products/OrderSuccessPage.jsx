import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[75vh]">
      <div className="max-w-2xl mx-auto text-center bg-white p-10 shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase! Your order has been received. You will
          receive a confirmation email soon.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-[#008800] text-white py-3 px-6 rounded-lg hover:bg-[#254227] font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
