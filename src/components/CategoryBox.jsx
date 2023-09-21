import React from "react";

export default function CategoryBox({ src }) {
  return (
    <div className="category-box">
      <img src={src.img}></img>
      <video autoPlay={true} loop={true} playsInline={true}>
        <source src={src.vid} type="video/mp4" />
      </video>
    </div>
  );
}
