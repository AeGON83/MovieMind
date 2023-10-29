import React from "react";
import CategoryBox from "./CategoryBox";
import marvelVid from "../assets/catagory-vids/marvel.mp4";
import disneyVid from "../assets/catagory-vids/disney.mp4";
import starwarLogo from "../assets/catagory-imgs/viewers-starwars.png";
import starwarVid from "../assets/catagory-vids/star-wars.mp4";
import pixarVid from "../assets/catagory-vids/pixar.mp4";

export default function CategoryBar() {
  const categorySrcList = [
    {
      id: 86311,

      img: "https://image.tmdb.org/t/p/original/cBpQgSEoFlmuGTCIoVKhq1Jy2tM.png",
      vid: marvelVid,
    },
    {
      id: 645,
      img: "https://image.tmdb.org/t/p/original/h02wT4F1aPBkQ94NlSx3ypOI5xl.png",
      vid: pixarVid,
    },
    {
      id: 1241,
      img: "https://image.tmdb.org/t/p/original/jIR5aWOBsjPVoCwDMQcrY4iaxcd.png",
      vid: disneyVid,
    },
    {
      id: 10,
      img: starwarLogo,
      vid: starwarVid,
    },
    {
      id: 9485,
      img: "https://image.tmdb.org/t/p/original/jCbjdbiG1BtiX4aqhvgf6YdXuIq.png",
      vid: pixarVid,
    },
    {
      id: 87359,
      img: "https://image.tmdb.org/t/p/original/tRwySKvciecGLk7C3A7e3WmF1dU.png",
      vid: starwarVid,
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
