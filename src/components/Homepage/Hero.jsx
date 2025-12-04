import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cloth1 from "../../assets/Images/cloth1.jpg";
import cloth2 from "../../assets/Images/cloth2.jpg";
import cloth3 from "../../assets/Images/cloth3.jpg";

const Hero = () => {
  const [index, setIndex] = useState(0);
  const images = [cloth1, cloth2, cloth3];
  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className=" pb-4 overflow-hidden">
      <div className="relative w-full h-screen">
        {/* Slides */}
        <AnimatePresence mode="sync">
          {" "}
          <motion.div
            key={index}
            className="absolute w-full h-full top-0 left-0"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img
              src={images[index]}
              loading="lazy"
              alt="hero"
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-white scale-125" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="flex flex-col items-center gap-4 lg:gap-10">
            <div className="flex flex-col items-center gap-2 lg:gap-4">
              <h1 className=" text-white heading-primary">New Collection</h1>
              <p className="heading-secondary text-white ">
                Discover the latest trends in fashion
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 lg:px-5 py-2 lg:py-3 cursor-pointer hover:scale-105 transition-transform duration-300">
              <button className="text-base sm:text-lg lg:text-xl font-montserrat font-normal cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
