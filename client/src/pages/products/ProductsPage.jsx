import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { fetchProducts } from "../../services/productService";
import ProductCard from "../../components/ProductCard";
import { Button } from "flowbite-react";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
  const [selectedType, setSelectedType] = useState({
    detergent: false,
    soap: false,
    cleaning: false,
    other: false,
  });
  const [sortOrder, setSortOrder] = useState("createdAt_desc");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from the backend API
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const filters = {
        searchTerm,
        ...selectedAvailability,
        selectedType,
        sortOrder,
      };
      const fetchedProducts = await fetchProducts(filters);
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, [searchTerm, selectedAvailability, selectedType, sortOrder]);

  // Handle change of search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle change of checkbox state for availability
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedAvailability((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // Handle change of checkbox state for product type
  const handleTypeChange = (e) => {
    const { id, checked } = e.target;
    setSelectedType((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // Reset availability checkboxes
  const resetAvailability = () => {
    setSelectedAvailability({ inStock: false, outOfStock: false });
  };

  // Reset product type checkboxes
  const resetTypes = () => {
    setSelectedType({
      detergent: false,
      soap: false,
      cleaning: false,
      other: false,
    });
  };

  return (
    <div className="flex">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/75 z-50">
          <RingLoader color="#4A90E2" size={100} />
        </div>
      )}

      <div className="w-1/4 bg-gray-100 border-r-2 border-gray-100 pb-4 min-h-screen">
        <form className="flex flex-col justify-between gap-y-4 px-4 py-8">
          <div className="flex gap-2">
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          {/* Availability section */}
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-3xl text-center underline mb-5">
              Filters
            </h1>
            <label className="font-semibold">Availability:</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="inStock"
                checked={selectedAvailability.inStock}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <label htmlFor="inStock">In Stock</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="outOfStock"
                checked={selectedAvailability.outOfStock}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <label htmlFor="outOfStock">Out of Stock</label>
            </div>
            <button
              onClick={resetAvailability}
              type="button"
              className="text-gray-400 underline text-sm"
            >
              Reset
            </button>
          </div>

          {/* Product Type section */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Product Type:</label>
            <div className="grid grid-cols-2 gap-2">
              {["detergent", "soap", "cleaning", "other"].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={type}
                    checked={selectedType[type]}
                    onChange={handleTypeChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            <button
              onClick={resetTypes}
              type="button"
              className="text-gray-400 underline text-sm"
            >
              Reset
            </button>
          </div>

          {/* Sort and Search button */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-x-6">
              <label className="font-semibold">Sort:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded-lg p-2"
              >
                <option value="price_desc">Price high to low</option>
                <option value="price_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="w-3/4 px-4">
        <h3 className="text-2xl font-semibold tracking-tight mt-6">
          Available Soap Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          {products.length > 0 ? (
            products.map((item) => <ProductCard key={item._id} item={item} />)
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
