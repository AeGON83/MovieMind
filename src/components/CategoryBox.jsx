import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryBox({ src }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
  };

  function handleMoveToCollection() {
    navigate(`/Collection/${src.id}`);
  }

  return (
    <div
      className="category-box"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMoveToCollection}
    >
      <img
        style={{
          objectFit: "contain",
          scale: "0.9",
        }}
        src={src.img}
      ></img>
      <video ref={videoRef} loop={true} playsInline={true} muted>
        <source src={src.vid} type="video/mp4" />
      </video>
    </div>
  );
}
