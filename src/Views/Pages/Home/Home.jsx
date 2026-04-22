import React from "react";
import Hero from "../../../components/Homepage/Hero";
import TrendingNow from "../../../components/Homepage/TrendingNow";
import Subscribe from "../../../components/Homepage/Subscribe";
import FeaturedCategory from "../../../components/Homepage/FeaturedCollection";
import RecommendedProduct from "../../../components/Homepage/RecommendedProduct";
import Trendsetters from "../../../components/Homepage/Trendsetters";
import About from "../../../components/Homepage/About";
import Videosection from "../../../components/Homepage/Videosection";
import DesignedToDisrupt from "../../../components/Homepage/DesignedToDisrupt";

const Home = () => {
  return (
    <div className="bg-black text-zinc-100">
      <Hero />
      <DesignedToDisrupt/>
      {/* <FeaturedCategory />
      <RecommendedProduct /> */}
      <TrendingNow/>
      <Videosection/>
      <About/>
      <Trendsetters />
      <Subscribe />
    </div>
  );
};

export default Home;
