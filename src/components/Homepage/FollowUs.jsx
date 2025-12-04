import React from "react";
import shirt from "../../assets/Images/shirt.jpg";
import pant from "../../assets/Images/pant.jpg";
import jacket from "../../assets/Images/jacket.jpg";
import sneakers from "../../assets/Images/sneakers.jpg";

const FollowUs = () => {
  const images = [shirt, pant, jacket, sneakers, shirt, pant, jacket, sneakers];
  return (
    <div className="container mx-auto px-8 py-4 space-y-10">
      <div className="flex flex-col items-center">
        <p className="title-primary ">Follow Us @fashionbrand</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 place-items-center">
        {images.map((item, id) => (
          <div key={id}>
            <img
              src={item}
              alt="follow us"
              className="object-cover size-48 hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowUs;
