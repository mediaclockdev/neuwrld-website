import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../../features/dashboard/dashboardSlice";
import { motion, AnimatePresence } from "framer-motion";

const Hero = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.dashboard);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  const images =
    data?.data?.home_banner?.map((item) => item.settings?.image) || [];

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading hero</p>;

  return (
    <div className=" overflow-hidden">
      <div className="relative w-full aspect-[4/5] sm:aspect-auto sm:h-[65vh] md:h-[75vh] lg:h-[80vh]">
        <AnimatePresence mode="sync">
          {images.length > 0 && (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <img
                src={images[index]}
                alt="hero"
                className="w-full h-full object-cover"
              />
              {/* <div className="absolute inset-0 bg-black/30 "></div> */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* dots */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        {/* <div className="absolute inset-0 flex items-center justify-center z-30">
          <div className="flex flex-col items-center gap-4 lg:gap-10">
            <div className="flex flex-col items-center gap-2 lg:gap-4">
              <h1 className="text-white heading-primary">New Collection</h1>
              <p className="heading-secondary text-white">
                Discover the latest trends in fashion
              </p>
            </div>
            <div className="rounded-2xl bg-white px-4 lg:px-5 py-2 lg:py-3 cursor-pointer hover:scale-105 transition-transform duration-300">
              <button className="text-base sm:text-lg lg:text-xl font-montserrat font-normal cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
