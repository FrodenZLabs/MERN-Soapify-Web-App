import React from "react";

const GetAppSection = () => {
  return (
    <div
      className="bg-gray-400 h-[55vh] relative flex items-center justify-center text-center text-white px-4"
      style={{
        backgroundImage: "url('https://via.placeholder.com/1920x1080')", // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-4">Get the Soapify App</h2>
        <p className="text-lg mb-6">
          Download the app today and shop on the go. Enjoy exclusive discounts
          and seamless shopping.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition">
            App Store
          </button>
          <button className="bg-white text-gray-800 px-6 py-2 rounded-md hover:bg-gray-200 transition">
            Play Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetAppSection;
