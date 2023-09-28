/** @format */

import React from "react";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import CategoryBar from "./CategoryBar";
import Account from "./user/Account";
import MovieCard from "./MovieCard";

export default function () {
  return (
    <>
      <div className="homepage-first-screen">
        <Navbar />
        <SearchBar />
        <CategoryBar />
        {/* <Account /> */}
        <MovieCard />
      </div>
    </>
  );
}
