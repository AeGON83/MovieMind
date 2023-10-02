import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import forwardIcon from "../assets/icons/forward-icon.svg";
import backwardIcon from "../assets/icons/backward-icon.svg";

export default function CardSlider(props) {
  const data = props.data;

  // const [backdropIndex, setBackdropIndex] = useState(0);

  // 	useEffect(() => {
  // 		const timeoutId = setTimeout(() => {
  // 			setBackdropIndex((old) => (old + 1) % posterSectionList.results.length);
  // 		}, 50000);

  // 		return () => {
  // 			clearTimeout(timeoutId);
  // 		};
  // 	}, [posterSectionList.results]);

  const sliderRef = useRef(null);

  const handleSlideLeft = () => {
    if (sliderRef.current) {
      const currentScrollLeft = sliderRef.current.scrollLeft;
      const newScrollLeft = currentScrollLeft - 500; // Scroll left by 100 pixels
      smoothScroll(sliderRef.current, currentScrollLeft, newScrollLeft);
    }
  };

  const handleSlideRight = () => {
    if (sliderRef.current) {
      const currentScrollLeft = sliderRef.current.scrollLeft;
      const newScrollLeft = currentScrollLeft + 500; // Scroll right by 100 pixels
      smoothScroll(sliderRef.current, currentScrollLeft, newScrollLeft);
    }
  };

  const smoothScroll = (element, from, to, duration = 900) => {
    const start = performance.now();
    const ease = (t) => t * (2 - t); // Easing function for a smooth transition

    const step = (timestamp) => {
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollLeft = from + (to - from) * ease(progress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleSlideRight2 = () => {
    if (sliderRef.current) {
      let currentScrollLeft = sliderRef.current.scrollLeft;
      let newScrollLeft = currentScrollLeft + 300; // Scroll right by 500 pixels

      if (newScrollLeft >= 3188.392822265625) {
        newScrollLeft = 0;
        currentScrollLeft = 0;
        smoothScroll(sliderRef.current, currentScrollLeft, newScrollLeft);
      } else {
        smoothScroll(sliderRef.current, currentScrollLeft, newScrollLeft);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSlideRight2();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <div className="movie-cards-container" ref={sliderRef}>
        {/* <button
          className="movie-card-slider-button left-btn"
          onClick={handleSlideLeft}
        >
          &lt;
        </button> */}
        {data
          ? data.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                poster_path={item.poster_path}
                title={item.title}
                name={item.name}
                overview={item.overview}
                release_date={item.release_date}
                first_air_date={item.first_air_date}
                vote_average={item.vote_average}
              />
            ))
          : "error"}
        {/* <button
          className="movie-card-slider-button right-btn"
          onClick={handleSlideRight}
        >
          &gt;
        </button> */}
        <div
          className="slider-nav"
          style={{
            bottom: "35%",
            right: "0",
            zIndex: 13,
            // top:"calc(-1rem + 10px)"
          }}
        >
          <img
            src={backwardIcon}
            style={{ backgroundColor: "rgba(207, 20, 20, 0.4)" }}
            className="slider-nav-btn"
            onClick={handleSlideLeft}
          />
          <img
            src={forwardIcon}
            style={{ backgroundColor: "rgba(207, 20, 20, 0.4)" }}
            className="slider-nav-btn"
            onClick={handleSlideRight}
          />
        </div>
      </div>
    </>
  );
}
