import React from "react";
import img1 from "../../assets/svg/img1.svg";
import img2 from "../../assets/svg/img2.svg";
import img3 from "../../assets/svg/img3.svg";
import img4 from "../../assets/svg/img4.svg";

const DesignedToDisrupt = () => {
    
    const product = [
        {
            name: "Unisex Hoodie Blue",
            price: "AUD 15 $",
            image: img1,
            secondaryimg: img2,
        },
        {
            name: "Unisex Hoodie Dark",
            price: "AUD 15 $",
            image: img3,
            secondaryimg: img4,

        },
        {
            name: "Unisex Hoodie Blue",
            price: "AUD 15 $",
            image: img1,
            secondaryimg: img2,

        },
        {
            name: "Unisex Hoodie Dark",
            price: "AUD 15 $",
            image: img3,
            secondaryimg: img4,

        }
    ]

  return (
    <div className="max-w-screen-2xl mx-auto py-10 px-5 overflow-visible">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-5">
        <h2 className="font-tektur text-3xl sm:text-4xl lg:text-5xl xl:text-[70px]">
          <span className="text-white font-medium">Designed To </span>
          <span
            className="font-bold "
            style={{
              color: "transparent",
              WebkitTextStroke: "1px #BCC3C4",
            }}
          >
            Disrupt
          </span>
        </h2>

      {/* Subtitle */}
      <p className="font-tektur text-white text-sm sm:text-base text-center max-w-[580px] ">
        Luxury staples for modern disruptors. Precision tailored pieces that break convention and redefine presence. THIS ISN’T JUST A FASHION IT’S A STATEMENT...
      </p>
      </div>

      {/* Staggered Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-end">
        {product.map((item, index) => (
          <div
            key={index}
            className={`group cursor-pointer transition-transform duration-500 ${
              index % 2 === 0 ? "lg:mb-16" : "lg:mt-16"
            }`}
            style={{
              transform: `rotate(${index % 2 === 0 ? "-3" : "3"}deg)`,
            }}
          >
            {/* Image with hover swap */}
            <div className="relative rounded-lg overflow-hidden mb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[280px] sm:h-[340px] lg:h-[380px] object-cover transition-opacity duration-500 group-hover:opacity-0"
              />
              <img
                src={item.secondaryimg}
                alt={`${item.name} hover`}
                className="absolute inset-0 w-full h-[280px] sm:h-[340px] lg:h-[380px] object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
            <p className="font-tektur text-white text-sm sm:text-base font-medium">
              {item.price}
            </p>
            <p className="font-tektur text-white/80 text-sm">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignedToDisrupt;