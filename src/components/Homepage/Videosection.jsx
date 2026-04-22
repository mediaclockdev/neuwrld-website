import React from 'react'
import fashion from "../../assets/fashion.mp4";

const Videosection = () => {
  return (
    <div className="max-w-screen-2xl mx-auto py-6">
      <video
        className="object-cover  h-full w-full rounded-xl shadow-lg"
         autoPlay
        muted
        loop
              playsInline

      >
        <source src={fashion} type="video/mp4" />
      </video>
    </div>
  );
};

export default Videosection