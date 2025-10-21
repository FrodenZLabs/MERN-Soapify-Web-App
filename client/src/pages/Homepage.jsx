import CategoriesSection from "../components/CategoriesSection";
import FeaturesSection from "../components/FeaturesSection";
import GetAppSection from "../components/GetAppSection";
import Herosection from "../components/Herosection";
import TopSellingSection from "../components/TopSellingSection";

const Homepage = () => {
  return (
    <div>
      <Herosection />
      <CategoriesSection />
      <TopSellingSection />
      <GetAppSection />
      <FeaturesSection />
    </div>
  );
};

export default Homepage;
