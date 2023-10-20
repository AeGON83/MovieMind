/** @format */

import React from "react";
import PosterSection from "./PosterSection";
import Navbar from "./Navbar";

export default function TvSection() {
  const sections = [
    { type: "/tv", url: "/airing_today", title: "airing today" },
    { type: "/tv", url: "/on_the_air", title: "on the air" },
    { type: "/tv", url: "/popular", title: "popular" },
    { type: "/tv", url: "/top_rated", title: "top rated" },
  ];
  return (
    <div>
      {/* {console.log("TvSection")} */}
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
