import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../../components/Homepage/Hero";
import TrendingNow from "../../../components/Homepage/TrendingNow";
import Subscribe from "../../../components/Homepage/Subscribe";
import FeaturedCategory from "../../../components/Homepage/FeaturedCollection";
import RecommendedProduct from "../../../components/Homepage/RecommendedProduct";
import Trendsetters from "../../../components/Homepage/Trendsetters";
import About from "../../../components/Homepage/About";
import Videosection from "../../../components/Homepage/Videosection";
import DesignedToDisrupt from "../../../components/Homepage/DesignedToDisrupt";
import { fetchDashboard } from "../../../features/dashboard/dashboardSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!data && !loading) {
      dispatch(fetchDashboard());
    }
  }, [data, loading, dispatch]);

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
