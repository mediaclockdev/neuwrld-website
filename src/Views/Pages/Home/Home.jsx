import React from "react";
import Hero from "../../../components/Homepage/Hero";
import TrendingNow from "../../../components/Homepage/TrendingNow";
import FollowUs from "../../../components/Homepage/FollowUs";
import Subscribe from "../../../components/Homepage/Subscribe";
import FeaturedCategory from "../../../components/Homepage/FeaturedCollection";
import RecommendedProduct from "../../../components/Homepage/RecommendedProduct";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategory />
      <RecommendedProduct />
      {/* <TrendingNow />
      <FollowUs />
      <Subscribe /> */}
    </div>
  );
};

export default Home;
