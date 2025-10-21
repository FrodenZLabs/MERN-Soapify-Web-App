import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarHeader from "./components/NavbarHeader";
import FooterSection from "./components/FooterSection";
import { ThemeInit } from "../.flowbite-react/init";
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/authentication/RegisterPage";
import LoginPage from "./pages/authentication/LoginPage";
import ProductPage from "./pages/products/ProductsPage";
import ProductItemsPage from "./pages/products/ProductItemsPage";
import OnlyUserPrivateRoute from "./components/OnlyUserPrivateRoute";
import TrackOrder from "./pages/users/TrackOrder";
import OrderDetailsPage from "./pages/users/OrderDetailsPage";
import CheckoutPage from "./pages/products/CheckoutPage";
import OrderSuccessPage from "./pages/products/OrderSuccessPage";
import UserProfilePage from "./pages/users/UserProfilePage";
import OrdersPage from "./pages/users/OrdersPage";
import CartPage from "./pages/products/CartPage";

function App() {
  return (
    <BrowserRouter>
      <ThemeInit />
      <ToastContainer />
      <NavbarHeader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductItemsPage />} />
        <Route path="/products" element={<ProductPage />} />

        <Route element={<OnlyUserPrivateRoute />}>
          <Route path="/my-orders" element={<OrdersPage />} />
          <Route path="/my-orders/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/product/checkout" element={<CheckoutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/order-success" element={<OrderSuccessPage />} />
          <Route path="/track-orders" element={<TrackOrder />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
      </Routes>
      <FooterSection />
    </BrowserRouter>
  );
}

export default App;
