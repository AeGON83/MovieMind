import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import CategoryBar from "./CategoryBar";
import PosterSection from "./PosterSection";

export default function () {
  const sections = [
    { url: "movie/now_playing", title: "popular" },
    { url: "movie/top_rated", title: "top rated" },
    { url: "movie/upcoming", title: "upcoming" },
    { url: "tv/top_rated", title: "top rated" },
    { url: "movie/popular", title: "popular" },
  ];

  return (
    <>
      {/* <div className="homepage-first-screen">
        <Navbar />
        <SearchBar />
        <CategoryBar />
      </div> */}
      {sections.map((section, index) => (
        <PosterSection key={index} url={section.url} title={section.title} />
      ))}
    </>
  );
}
