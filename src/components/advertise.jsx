// @TODO - 광고 기능 구현
import React, { useState, useEffect } from "react";
import "../css/advertise.css";

const adData = [
  {
    type: "image",
    src: "src/resources/images/nike.png",
    link: "https://www.nike.com",
  },
  {
    type: "image",
    src: "src/resources/images/iphone16.png",
    link: "https://www.apple.com/iphone-16",
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    link: "https://www.w3schools.com",
  },
  {
    type: "image",
    src: "src/resources/images/lggram.png",
    link: "https://www.lge.co.kr/care-solutions/notebook",
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

  return (
    <div className="ad-slider-container">
      <div className="ad-content">
        <a
          href={adData[currentIndex].link}
          target="_blank"
          rel="noopener noreferrer"
        >
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
        </a>
      </div>
    </div>
  );
};

export default Advertise;
