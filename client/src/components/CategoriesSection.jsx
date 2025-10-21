import React from "react";
import { Link } from "react-router-dom";
import DetergentImage from "../assets/images/products/detergent.jpg";
import CleaningImage from "../assets/images/products/cleaning.jpg";
import SoapImage from "../assets/images/products/soap.jpg";
import OtherImage from "../assets/images/products/other.jpg";

const CategoriesSection = () => {
  const categories = [
    {
      name: "Detergent",
      image: DetergentImage,
      link: "/category/detergent",
    },
    {
      name: "Soap",
      image: SoapImage,
      link: "/category/soap",
    },
    {
      name: "Cleaning",
      image: CleaningImage,
      link: "/category/cleaning",
    },
    {
      name: "Other",
      image: OtherImage,
      link: "/category/other",
    },
  ];

  return (
    <div className="h-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-2">
        {categories.map((category, index) => (
          <div key={index} className="relative group overflow-hidden">
            {/* Category Image */}
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                to={category.link}
                className="text-white text-lg font-semibold bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
