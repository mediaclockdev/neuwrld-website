import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, ALL_APi_LIST } from "../../../api/apiList";

const ProductList = () => {
  const { gender, category, subCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ✅ build query properly
        const params = new URLSearchParams();
        params.append("gender", gender);
        params.append("category", category);

        if (subCategory) {
          params.append("sub_category", subCategory);
        }

        const url = `${BASE_URL}${
          ALL_APi_LIST.productList
        }?${params.toString()}`;

        console.log("ROUTE PARAMS:", { gender, category, subCategory });
        console.log("FINAL API URL:", url);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("PRODUCT API RESPONSE:", data);

        setProducts(data?.data || []);
      } catch (err) {
        console.error("PRODUCT FETCH ERROR:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [gender, category, subCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold capitalize mb-6">
        {subCategory ?? category} ({gender})
      </h1>

      {loading && <p>Loading products...</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-500">No products found</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div className="aspect-[3/4] bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-3 space-y-1">
              <p className="text-sm font-medium line-clamp-2">{product.name}</p>
              <p className="text-sm font-semibold">₹ {product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
