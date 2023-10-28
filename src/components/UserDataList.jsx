import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useAuth } from "./user/AuthContext";

export default function UserDataLists() {
  const { dataType } = useParams();
  const { currentUser } = useAuth();

  const [dbList, setDbList] = useState([]);
  const [movieData, setMovieData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_API_KEY,
    },
  };

  useEffect(() => {
    if (currentUser) {
      const fireBaseUid = currentUser.uid;

      axios
				.get(`https://moviemind-server.onrender.com/get-user-data-list`, {
					params: {
						fireBaseUid,
						dataType,
					},
				})
				.then((response) => {
					setDbList(response.data.arrayData);
				})
				.catch((error) => {
					console.error(error);
				});
    }
  }, [dataType, currentUser]);

  useEffect(() => {
    // Fetch additional data for rendering MovieCard components
    const fetchDataForMovieCards = async () => {
      const movieDataPromises = dbList.map((item) => {
        return axios.get(
          `https://api.themoviedb.org/3/${item.type}/${item.id}?append_to_response=images,peoples&language=en`,
          options
        );
      });

      const resolvedMovieData = await Promise.all(movieDataPromises);

      // Store the resolved movie data
      setMovieData(resolvedMovieData.map((response) => response.data));
    };

    // Only fetch data if there are items in dbList
    if (dbList.length > 0) {
      fetchDataForMovieCards();
    }
  }, [dbList]);

  function renderMovieCards() {
    if (movieData.length === dbList.length) {
      // Check if movieData is fully populated before rendering
      return movieData.map((data, index) => (
        <MovieCard
          type={dbList[index].type}
          key={dbList[index].id + dbList[index].type}
          id={dbList[index].id}
          poster_path={data.poster_path}
          title={data.title}
          name={data.name}
          overview={data.overview}
          release_date={data.release_date}
          first_air_date={data.first_air_date}
          vote_average={data.vote_average}
        />
      ));
    } else {
      return "Loading..."; // You can display a loading message until data is ready
    }
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />
      {currentUser ? (
        <div>
          <div className="list-titele">
            <h1 style={{ marginLeft: "4%" }}>{dataType}</h1>
          </div>
          <div
            className="movies-slides"
            style={{
              position: "relative",
              justifyContent: "center",
              width: "100%",
              height: "fit-content",
              backgroundColor: "transparent",
              top: "calc(100% - 275px)",
              rowGap: "20px",
              overflow: "hidden",
            }}
          >
            {renderMovieCards()}
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "30px", letterSpacing: "2px" }}>
            Please log in to add to {dataType}
          </p>
          <button
            className="normal-button"
            style={{
              width: "150px",
              height: "60px",
              background: "brown",
              fontSize: "20px",
            }}
            onClick={() => navigate("/signup")}
          >
            Log In
          </button>
        </div>
      )}
    </div>
  );
}
