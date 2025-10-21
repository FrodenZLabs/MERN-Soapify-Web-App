import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrdersByID } from "../../services/orderService";
import { RingLoader } from "react-spinners";
import { Button } from "flowbite-react";

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null); // State for storing order details
  const [loading, setLoading] = useState(true); // State for loading
  const { id } = useParams(); // Extract order ID from URL parameters

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetchOrdersByID(id);

        setOrder(response.order); // Set order details in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order:", err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {/* No Order Found */}
      {!order && <p className="text-center text-gray-500">Order not found.</p>}

      {/* Display Order Details */}
      {order && (
        <div>
          {/* Order Summary */}
          <div className="border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold mb-2">Order #{order._id}</h2>
            <p className="text-sm text-gray-500">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Total Amount: ${order.totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              Payment Status: {order.paymentStatus}
            </p>
          </div>

          {/* User Details */}
          <div className="border-b pb-4 mb-6">
            <h3 className="font-semibold mb-2">User Information</h3>
            <p>Name: {order.userId.username || "N/A"}</p>
            <p>Email: {order.userId.email || "N/A"}</p>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-2">Items Ordered</h3>
            <ul>
              {order.items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center">
                    <img
                      src={item.productId.images[0]} // Use product image URL
                      alt={item.productId.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p className="font-medium">{item.productId.name}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Link to={"/my-orders"}>
        <Button className="mt-14 w-full">Go Back</Button>
      </Link>
    </div>
  );
};

export default OrderDetailsPage;
