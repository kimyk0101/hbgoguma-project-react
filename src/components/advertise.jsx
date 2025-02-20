// @TODO - 광고 기능 구현
import React, { useState, useEffect } from "react";
import "../css/advertise.css";

const adData = [
  {
    type: "image",
    src: "src/resources/images/nike.png",
  },
  {
    type: "image",
    src: "src/resources/images/iphone16.png",
  },
  { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
  {
    type: "image",
    src: "src/resources/images/lggram.png",
  },
];

const Advertise = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % adData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // const prevSlide = () => {
  //   setCurrentIndex(
  //     (prevIndex) => (prevIndex - 1 + adData.length) % adData.length
  //   );
  // };

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % adData.length);
  // };

  return (
    <div className="ad-slider-container">
      {/* <button className="prev-button" onClick={prevSlide}>
        &#10094;
      </button> */}
      <div className="ad-content">
        {adData[currentIndex].type === "image" ? (
          <img
            src={adData[currentIndex].src}
            alt="광고 이미지"
            className="ad-image"
          />
        ) : (
          <video
            src={adData[currentIndex].src}
            autoPlay
            loop
            muted
            className="ad-video"
          ></video>
        )}
         {adData[currentIndex].type === "image" ? (
          <img
            src={adData[currentIndex].src}
            alt="광고 이미지"
            className="ad-image"
          />
        ) : (
          
          <video
            src={adData[currentIndex].src}
            autoPlay
            loop
            muted
            className="ad-video"
          ></video>
        )}
         {adData[currentIndex].type === "image" ? (
          <img
            src={adData[currentIndex].src}
            alt="광고 이미지"
            className="ad-image"
          />
        ) : (
          <video
            src={adData[currentIndex].src}
            autoPlay
            loop
            muted
            className="ad-video"
          ></video>
        )}
        {adData[currentIndex].type === "image" ? (
          <img
            src={adData[currentIndex].src}
            alt="광고 이미지"
            className="ad-image"
          />
        ) : (
          <video
            src={adData[currentIndex].src}
            autoPlay
            loop
            muted
            className="ad-video"
          ></video>
        )}
      </div>
      {/* <button className="next-button" onClick={nextSlide}>
        &#10095;
      </button> */}
    </div>
  );
};

export default Advertise;
