import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import HeroSkeleton from "./Heroskeleton";
import arrow from "../../assets/svg/icons/rightarrow.svg";

const Hero = () => {
  const MotionImg = motion.img;
  const { data, loading, error } = useSelector((state) => state.dashboard);

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const images = useMemo(
    () => data?.data?.home_banner?.map((item) => item.settings?.image) || [],
    [data]
  );

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  if (loading) return <HeroSkeleton />;
  if (error) return <p className="text-red-500">Error loading hero</p>;

  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] min-h-[500px] max-h-[600px] overflow-visible">
      {images.map((src, i) => (
        <MotionImg
          key={i}
          src={src}
          alt="hero background"
          className={`absolute inset-0 w-full h-full object-cover object-top md:object-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 px-5">
        <h1 className="text-white uppercase space-y-4">
          <span className="block text-3xl md:text-6xl lg:text-[80px] font-bold font-tektur">
            We Are Not
          </span>
          <span className="block text-3xl md:text-6xl lg:text-[80px] font-bold font-tektur">
            Just Fashion
          </span>
          <p className="block text-3xl md:text-6xl lg:text-[90px] font-bold font-tektur">
            We&apos;re{" "}
            <span
              className="bg-black text-white px-2 py-1 inline-block font-bold font-tektur"
              style={{
                color: "transparent",
                WebkitTextStroke: "4px #CACFD2",
              }}
            >
              CULTURE.
            </span>
          </p>
        </h1>
        <div className="mt-8 bg-white rounded-tr-[100px] rounded-bl-[100px] px-10 lg:px-8 py-5 max-w-[395px] flex flex-col justify-center items-center">
          <p className="text-black text-xs lg:text-sm font-medium font-tektur">
            From underground street wear to innovative eco friendly designs,
            our brand reflects energy of streets and future of designs.
            Explore our collections that shows drop &amp; underground culture
            and shows confidence and creativity.
          </p>

          <button
            className="relative mt-5 bg-black text-white font-bold py-2.5 px-2.5 flex items-center gap-4 text-sm overflow-hidden group cursor-pointer rounded-tr-[5px] rounded-bl-[5px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span
              className={`absolute inset-0 bg-[#909497] transform transition-transform duration-500 ease-out ${
                isHovered ? "translate-x-0" : "-translate-x-full"
              }`}
            />
            <span className="relative z-10 font-tektur text-base lg:text-xl font-normal transition-colors duration-500">
              Explore our collection
            </span>
            <span className="relative z-10 transition-colors duration-500">
              <img src={arrow} alt="right arrow" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
