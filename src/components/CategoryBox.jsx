import React, { useRef } from "react";

export default function CategoryBox({ src }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
  };

  return (
    <div
      className="category-box"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={src.img}></img>
      <video ref={videoRef} loop={true} playsInline={true} muted>
        <source src={src.vid} type="video/mp4" />
      </video>
    </div>
  );
}
