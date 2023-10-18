// import React, { useState, useRef } from "react";
// import MovieCard from "./MovieCard";

// export default function CardSlider(props) {
//   const data = props.data;

//   const innerContainerRef = useRef();
//   const outerContainerRef = useRef();
//   const [isPaused, setPaused] = useState(false);
//   const [transformPosition, setTransformPosition] = useState(0);

//   const stopAnimation = () => {
//     innerContainerRef.current.style.left = window.getComputedStyle(
//       innerContainerRef.current
//     ).left;
//     setTransformPosition(
//       parseFloat(
//         window.getComputedStyle(innerContainerRef.current).left.slice(0, -2)
//       )
//     );
//     setPaused(true);
//   };

//   const scrollContainer = (direction) => {
//     let maxScrollX =
//       outerContainerRef.current.offsetWidth -
//       innerContainerRef.current.offsetWidth;

//     const scrollAmount = 500 * (direction === "right" ? -1 : 1);
//     if (direction == "left" && transformPosition + scrollAmount >= 0) {
//       setTransformPosition(0);
//       return;
//     }
//     if (
//       direction == "right" &&
//       transformPosition + scrollAmount <= maxScrollX
//     ) {
//       setTransformPosition(maxScrollX);
//       return;
//     }
//     setTransformPosition(transformPosition + scrollAmount);
//   };
//   const totalCards = data ? data.length : 0;

//   return (
//     <>
//       <div className="movie-cards-outer-container" ref={outerContainerRef}>
//         <div
//           className={`
//             movie-cards-inner-container ${isPaused ? "" : "animation-play"}`}
//           ref={innerContainerRef}
//           onMouseEnter={stopAnimation}
//           onMouseLeave={() => isPaused(false)}
//           style={{
//             "--total-cards": totalCards,
//             left: `${isPaused ? transformPosition : "0"}px`,
//           }}
//         >
//           {data
//             ? data.map((item) => (
//                 <MovieCard
//                   key={item.id}
//                   id={item.id}
//                   poster_path={item.poster_path}
//                   title={item.title}
//                   name={item.name}
//                   overview={item.overview}
//                   release_date={item.release_date}
//                   first_air_date={item.first_air_date}
//                   vote_average={item.vote_average}
//                 />
//               ))
//             : "error"}
//         </div>
//         <div
//           className="slider-nav"
//           style={{
//             bottom: "280px",
//             right: "10px",
//             zIndex: 13,
//           }}
//         >
//           <img
//             onMouseEnter={stopAnimation}
//             src={backwardIcon}
//             onMouseLeave={() => isPaused(false)}
//             style={{ backgroundColor: "rgba(207, 20, 20, 0.4)" }}
//             className="slider-nav-btn"
//             onClick={() => scrollContainer("left")}
//           />
//           <img
//             src={forwardIcon}
//             onMouseLeave={() => isPaused(false)}
//             onMouseEnter={stopAnimation}
//             style={{ backgroundColor: "rgba(207, 20, 20, 0.4)" }}
//             className="slider-nav-btn"
//             onClick={() => scrollContainer("right")}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// backup code

import React, { useState, useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import forwardIcon from "../assets/icons/forward-icon.svg";
import backwardIcon from "../assets/icons/backward-icon.svg";

export default function CardSlider(props) {
  const data = props.data;

  const [isHovered, setIsHovered] = useState(false);
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
    if (!isHovered && sliderRef.current) {
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
    }
  };

  const handleSlideLeft2 = () => {
    if (sliderRef.current) {
      let currentScrollLeft = sliderRef.current.scrollLeft;
      let temp = currentScrollLeft - 300; // Scroll right by 500 pixels

      if (temp <= 0) {
      } else {
        smoothScroll(sliderRef.current, currentScrollLeft, temp);
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
  }, [isHovered]);
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
              <div
                key={item.id}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              >
                <MovieCard
                  type={props.type}
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
              </div>
            ))
          : "error"}

        {/* <button
          className="movie-card-slider-button right-btn"
          onClick={handleSlideRight}
		  >
          &gt;
        </button> */}
      </div>
      <div
        className="slider-nav"
        style={{
          position: "absolute",
          zIndex: "100",
          bottom: "37%",
          right: "0px",
        }}
      >
        <img
          src={backwardIcon}
          style={{ backgroundColor: "#8b00008c" }}
          className="slider-nav-btn"
          onClick={handleSlideLeft}
        />
        <img
          src={forwardIcon}
          style={{ backgroundColor: "#8b00008c" }}
          className="slider-nav-btn"
          onClick={handleSlideRight}
        />
      </div>
    </>
  );
}
// ----------------------------------------------------------------------------------------------------
