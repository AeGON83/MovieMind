import React from "react";
import CategoryBox from "./CategoryBox";

export default function CategoryBar() {
  const categorySrcList = [
    {
      id: 86311,

      img: "https://image.tmdb.org/t/p/original/cBpQgSEoFlmuGTCIoVKhq1Jy2tM.png",
      vid: "src\\assets\\catagory-vids\\marvel.mp4",
    },
    {
      id: 645,
      img: "https://image.tmdb.org/t/p/original/h02wT4F1aPBkQ94NlSx3ypOI5xl.png",
      vid: "src\\assets\\catagory-vids\\disney.mp4",
    },
    {
      id: 1241,
      img: "https://image.tmdb.org/t/p/original/jIR5aWOBsjPVoCwDMQcrY4iaxcd.png",
      vid: "src\\assets\\catagory-vids\\pixar.mp4",
    },
    {
      id: 10,
      img: "src\\assets\\catagory-imgs\\viewers-starwars.png",
      vid: "src\\assets\\catagory-vids\\star-wars.mp4",
    },
    {
      id: 9485,
      img: "https://image.tmdb.org/t/p/original/jCbjdbiG1BtiX4aqhvgf6YdXuIq.png",
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
