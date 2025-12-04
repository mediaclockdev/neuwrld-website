import React from "react";
import Hero from "../../../components/Homepage/Hero";
import TrendingNow from "../../../components/Homepage/TrendingNow";
import FollowUs from "../../../components/Homepage/FollowUs";
import Subscribe from "../../../components/Homepage/Subscribe";

const Home = () => {
  return (
    <div>
      <Hero />
      <TrendingNow />
      <FollowUs />
      <Subscribe />
    </div>
  );
};

export default Home;
