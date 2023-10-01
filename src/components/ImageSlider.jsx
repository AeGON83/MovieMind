import React, { useState, useEffect } from "react";
import forwardIcon from "../assets/icons/forward-icon.svg";
import backwardIcon from "../assets/icons/backward-icon.svg";

export default function ImageSlider({ imageUrls }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      {imageUrls.map((url, index) => {
        return (
          <img
            key={index}
            src={url}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          />
        );
      })}
      <div className="slide-number-container">
        <p className="slider-number">{currentIndex + 1}</p>
        <hr />
        <p className="slider-number">{imageUrls.length}</p>
      </div>

      <div className="slider-nav">
        <img
          src={backwardIcon}
          className="slider-nav-btn"
          onClick={prevSlide}
        />
        <img src={forwardIcon} className="slider-nav-btn" onClick={nextSlide} />
      </div>
    </div>
  );
}
