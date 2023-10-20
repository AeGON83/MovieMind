/** @format */

import React from "react";
import PosterSection from "./PosterSection";
import Navbar from "./Navbar";

export default function MovieSection() {
  const sections = [
    { type: "movie", url: "/now_playing", title: "popular" },
    { type: "movie", url: "/top_rated", title: "top rated" },
    { type: "movie", url: "/upcoming", title: "upcoming" },
    { type: "movie", url: "/popular", title: "popular" },
  ];
  return (
    <div>
      <Navbar />
      {sections.map((section, index) => (
        <PosterSection
          key={index}
          url={section.url}
          title={section.title}
          type={section.type}
        />
      ))}
    </div>
  );
}
