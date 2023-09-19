import React from "react";

export default function CategoryBox({ autoPlay, loop, playInline }) {
  return (
    <div className="category-box">
      <img></img>
      <video autoPlay={autoPlay} loop={loop} playsInline={playInline}>
        <source type="video/mp4" />
      </video>
    </div>
  );
}
