import { Link } from "react-router-dom";
import HeroImage from "../assets/images/products/hero-image.jpg";

const Herosection = () => {
  return (
    <div
      className="relative h-[75vh] mb-1 flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to Soapify Shop</h1>
        <p className="text-xl mb-6">
          Discover the best cleaning products for your home.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/shop">
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition">
              Shop Now
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-gray-700 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
