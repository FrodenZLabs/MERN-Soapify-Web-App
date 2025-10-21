import React from "react";
import { BsAward, BsBoxSeam } from "react-icons/bs";
import { MdOutlineSupportAgent } from "react-icons/md";

const FeaturesSection = () => {
  // Features data
  const features = [
    {
      icon: <BsAward className="text-black text-3xl" />,
      title: "High Quality",
      description: "Crafted from top materials.",
    },
    {
      icon: <BsAward className="text-amber-300 text-3xl" />,
      title: "Warranty Protection",
      description: "Over 2 years.",
    },
    {
      icon: <BsBoxSeam className="text-green-500 text-3xl" />,
      title: "Affordable Shipping",
      description: "Order over 150.",
    },
    {
      icon: <MdOutlineSupportAgent className="text-blue-500 text-3xl" />,
      title: "24/7 Support",
      description: "Dedicated support.",
    },
  ];

  return (
    <div className="h-auto py-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-x-3 items-center p-4">
            {/* Icon */}
            <div className="">{feature.icon}</div>
            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-gray-600 font-light text-lg">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
