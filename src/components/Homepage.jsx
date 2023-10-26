import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import CategoryBar from "./CategoryBar";
import PosterSection from "./PosterSection";
import CommunityPage from "./CommunityPage";
import Footer from "./Footer";

export default function () {
  const sections = [
    { type: "movie", url: "/now_playing", title: "popular" },
    { type: "movie", url: "/top_rated", title: "top rated" },
    { type: "movie", url: "/upcoming", title: "upcoming" },
    { type: "tv", url: "/top_rated", title: "top rated" },
    { type: "movie", url: "/popular", title: "popular" },
  ];

  return (
    <>
      {/* <CommunityPage /> */}

      <div className="homepage-first-screen">
        <Navbar />
        <SearchBar />
        <CategoryBar />
      </div>
      {sections.map((section, index) => (
        <PosterSection
          key={index}
          url={section.url}
          title={section.title}
          type={section.type}
        />
      ))}
      <Footer/>
    </>
  );
}
