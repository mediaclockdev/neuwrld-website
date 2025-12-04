import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TrendingNow = () => {
  const products = useSelector((state) => state.products);

  return (
    <div className="container mx-auto px-6 lg:px-8 py-4 space-y-10">
      <div className="flex items-center justify-center">
        <p className="title-primary">Trending Now</p>
      </div>

      {/* Mens Collections */}
      <div className="space-y-5">
        <div>
          <p className="title-secondary">Men's Collection</p>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
            {products.men.map((item, id) => (
              <div key={id} className="flex flex-col gap-4">
                <div>
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="size-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-lato font-normal">{item.name}</h2>
                  <p className="text-[#4B5563] font-lato font-light">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Womens collections */}
      <div className="space-y-5">
        <div>
          <p className="title-secondary">Womens's Collection</p>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
            {products.women.map((item, id) => (
              <div key={id} className="flex flex-col gap-4">
                <div>
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="size-64 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg text-[#1C1C1E] font-lato font-normal">
                    {item.name}
                  </h2>
                  <p className="text-[#4B5563] font-lato font-light">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingNow;
