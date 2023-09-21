import React from "react";
import { useEffect, useState } from "react";
import CategoryBox from "./CategoryBox";

export default function CategoryBar() {
  const [showCategory, setShowCategory] = useState(false);

  useEffect(() => {
    setShowCategory(true);
  }, []);

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

  const categoryList1 = categorySrcList.map((item, index) => {
    return <CategoryBox key={index} src={item} />;
  });
  // const categoryList2 = categorySrcList.slice(4, 8).map((item, index) => {
  //   let style = { opacity: "1" };
  //   return (
  //     <CategoryBox
  //       key={index + 4}
  //       style={style}
  //       src={item}
  //       autoPlay={true}
  //       playInline={true}
  //       loop={true}
  //     />
  //   );
  // });

  return (
    <div className="category-main-wrapper">
      <div className="category-container">{categoryList1}</div>
    </div>
  );
}
