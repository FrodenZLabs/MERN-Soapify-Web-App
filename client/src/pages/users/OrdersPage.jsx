import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrdersByUserID } from "../../services/orderService";
import { RingLoader } from "react-spinners";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]); // State for storing orders
  const [loading, setLoading] = useState(true); // State for loading
  const { currentUser } = useSelector((state) => state.authentication); // Get current user
  const authId = currentUser?.user._id; // Extract user ID

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetchOrdersByUserID(authId);

        setOrders(response.data); // Set orders in state
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [authId]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {/* Full-screen loader */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      {/* No Orders */}
      {orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      {/* List of Orders */}
      {orders.length > 0 && (
        <div>
          {orders.map((order, index) => (
            <Link
              key={index}
              to={`/my-orders/orders/${order._id}`}
              className="block border-b-2 py-4 hover:bg-blue-100 hover:border-l-4 hover:border-l-blue-500 px-10 rounded-lg transition duration-300"
            >
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

              {/* Order Items */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Items:</h3>
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
