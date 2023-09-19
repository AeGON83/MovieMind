import React from "react";
import { useEffect, useState } from "react";

export default function CategoryBar() {
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    setShowCategory(true);
  }, []);

  const catagoryList1 = [0, 0, 0, 0].map((item, index) => {
    return (
      <div
        key={index}
        style={{ opacity: "1", backgroundColor: "red" }}
        className={`category-box show-box`}
      >
        1<img></img>
        <video autoPlay={true} loop={true} playsInline={true}>
          <source type="video/mp4" />
        </video>
      </div>
    );
  });
  const catagoryList2 = [0, 0, 0, 0].map((item, index) => {
    return (
      <div
        key={index}
        style={{ opacity: 1, backgroundColor: "blue" }}
        className={`category-box show-box`}
      >
        2<img></img>
        <video autoPlay={true} loop={true} playsInline={true}>
          <source type="video/mp4" />
        </video>
      </div>
    );
  });

  return (
    <div className="category-main-wrapper">
      <div className="category-container">
        {showCategory ? catagoryList2 : catagoryList1}
        <button
          className="normal-button catagory-bar-btn"
          onClick={() => {
            setShowCategory((old) => !old);
          }}
        >
          {showCategory ? "<" : ">"}
        </button>
      </div>
    </div>
  );
}
