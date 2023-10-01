import React from "react";
import CategoryBox from "./CategoryBox";

export default function CategoryBar() {
  const categorySrcList = [
    {
      img: "src\\assets\\catagory-imgs\\viewers-marvel.png",
      vid: "src\\assets\\catagory-vids\\marvel.mp4",
    },
    {
      img: "src\\assets\\catagory-imgs\\viewers-disney.png",
      vid: "src\\assets\\catagory-vids\\disney.mp4",
    },
    {
      img: "src\\assets\\catagory-imgs\\viewers-pixar.png",
      vid: "src\\assets\\catagory-vids\\pixar.mp4",
    },
    {
      img: "src\\assets\\catagory-imgs\\viewers-starwars.png",
      vid: "src\\assets\\catagory-vids\\star-wars.mp4",
    },
    {
      img: "src\\assets\\catagory-imgs\\viewers-disney.png",
      vid: "src\\assets\\catagory-vids\\disney.mp4",
    },
    {
      img: "src\\assets\\catagory-imgs\\viewers-pixar.png",
      vid: "src\\assets\\catagory-vids\\pixar.mp4",
    },
  ];

  return (
    <div className="category-main-wrapper">
      <div className="category-container">
        {categorySrcList.map((item, index) => {
          return <CategoryBox key={index} src={item} />;
        })}
      </div>
    </div>
  );
}
