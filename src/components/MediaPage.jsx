/** @format */

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Badge from "./Badge";
import Loading from "./Loading";
import ImageSlider from "./ImageSlider";
import { useParams, useNavigate, Link } from "react-router-dom";
import whitePlayIcon from "../assets/icons/play-icon-white.png";
import { useAuth } from "./user/AuthContext";
import MediaTabs from "./MediaTabs";

export default function MediaPage() {
  const navigat = useNavigate();
  const [mediaData, setMediaData] = useState({});
  const [data, setData] = useState({});
  const { id, type } = useParams();
  let { currentUser } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      const itemId = id; // Replace this with the actual item ID
      const itemType = type; // Replace this with the actual item type
      const userId = currentUser.uid;

      const response = await fetch("/api/addFavorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
          itemType: itemType,
          userId: userId,
        }),
      });

      if (response.ok) {
        // Handle success, e.g., update local state to reflect the change
        setIsFavorite(true);
        console.log("Item added to favorites successfully!");
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error("Failed to add item to favorites.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

    let url = `https://api.themoviedb.org/3/${type}/${id}?append_to_response=images,peoples&language=en`;

    fetch(url, options)
      .then((response) => response.json())
      .then((response) => {
        setMediaData(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let newData =
      type == "movie"
        ? {
            id: mediaData.id,
            type: mediaData.media_type,
            backdrop: `https://image.tmdb.org/t/p/original${
              mediaData.backdrop_path
                ? mediaData.backdrop_path
                : "/b3JtLWrdiJFCN8r9zuftgty8ddD.jpg"
            }`,
            ratingList: [
              mediaData.vote_average
                ? `${mediaData.vote_average}`.substr(0, 3)
                : "-",
              mediaData.release_date
                ? mediaData.release_date.substr(0, 4)
                : "-",
              mediaData.runtime
                ? `${Math.floor(mediaData.runtime / 60)}h ${
                    mediaData.runtime % 60
                  }m`
                : "-",
            ],
            logo:
              mediaData.images && mediaData.images.logos[0]
                ? `https://image.tmdb.org/t/p/original${mediaData.images.logos[0].file_path}`
                : false,
            title:
              mediaData.id && mediaData.title
                ? mediaData.title
                : mediaData.original_title
                ? mediaData.original_title
                : "-",

            genres:
              mediaData.id && mediaData.genres
                ? mediaData.genres.map((item) => item.name)
                : false,
            tagline:
              mediaData.id && mediaData.tagline
                ? mediaData.tagline.toUpperCase()
                : false,
            overview:
              mediaData.id && mediaData.overview ? mediaData.overview : false,
            watchLink: "",
          }
        : {
            id: mediaData.id,
            type: mediaData.media_type,
            backdrop: `https://image.tmdb.org/t/p/original${
              mediaData.backdrop_path
                ? mediaData.backdrop_path
                : "/b3JtLWrdiJFCN8r9zuftgty8ddD.jpg"
            }`,
            ratingList: [
              mediaData.vote_average
                ? `${mediaData.vote_average}`.substr(0, 3)
                : "-",
              mediaData.first_air_date
                ? `${mediaData.first_air_date.substr(0, 4)}${
                    mediaData.last_air_date
                      ? " - " + mediaData.last_air_date.substr(0, 4)
                      : "-"
                  }`
                : "-",
              mediaData.number_of_seasons
                ? mediaData.number_of_seasons + " Seasons"
                : "-",
              mediaData.number_of_episodes
                ? mediaData.number_of_episodes + " Episodes"
                : "-",
              mediaData.id && mediaData.status ? mediaData.status : "-",
            ],
            logo:
              mediaData.images && mediaData.images.logos[0]
                ? `https://image.tmdb.org/t/p/original${mediaData.images.logos[0].file_path}`
                : false,
            title:
              mediaData.id && mediaData.name
                ? mediaData.name
                : mediaData.original_name
                ? mediaData.original_name
                : "-",
            genres:
              mediaData.id && mediaData.genres
                ? mediaData.genres.map((item) => item.name)
                : false,
            tagline:
              mediaData.id && mediaData.tagline
                ? mediaData.tagline.toUpperCase()
                : false,
            overview:
              mediaData.id && mediaData.overview ? mediaData.overview : false,
            watchLink: "",
            seasons: mediaData.seasons,
          };
    setData(newData);
  }, [mediaData]);

  const badgeColorList = [
    "greenyellow",
    "red",
    "cyan",
    "lightgrey",
    "gold",
    "pink",
  ];
  const makeBadgeColor = (index) => {
    return badgeColorList[index % badgeColorList.length];
  };

  return (
    <div className="media-page">
      <div className="media-details">
        <Navbar
          navStyle={{
            height: "60px",
            backgroundColor: "#01010177",
            position: "absolute",
            top: 0,
            opacity: 1,
            zIndex: 2,
          }}
        />
        {data.id ? (
          <>
            <img
              className="backdrop-img"
              src={data.backdrop}
              alt="err getting image"
            />

            <div className="backdrop-details">
              <ul className="media-rating-list">
                {data.ratingList.map((item, index) => {
                  if (index == 0) {
                    return (
                      <li key={index}>
                        <div className="star-icon"></div>
                        {item}
                      </li>
                    );
                  }
                  return <li key={index}>{item}</li>;
                })}
              </ul>

              {data.logo ? (
                <img className="media-logo" src={data.logo} />
              ) : (
                <p className="media-logo-alt">{data.title}</p>
              )}

              {data.tagline && <p className="media-tagline">{data.tagline}</p>}
              <ul className="media-rating-list media-genere-list">
                {data.genres
                  ? data.genres.map((item, index) => {
                      return (
                        <Badge
                          key={index}
                          text={item}
                          color={makeBadgeColor(index)}
                        />
                      );
                    })
                  : ""}
              </ul>
              <p className="media-overview">{data.overview}</p>
              <div className="media-page-actions">
                <a
                  href={`/play/${id}`}
                  target="_blank"
                  className="normal-button media-page-play-btn"
                >
                  <img src={whitePlayIcon} alt="" />
                  WATCH
                </a>
                <button className="icon-button bookmark-btn "></button>
                <button
                  className={`icon-button heart-btn favorite ${
                    isFavorite ? "active" : ""
                  }`}
                  onClick={handleFavoriteClick}
                >
                  {/* You can customize the button icon based on the favorite status */}
                  {/* {isFavorite ? "Added to Favorites" : "Add to Favorites"} */}
                </button>
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>

      {type === "tv" && Array.isArray(data.seasons) && (
        <MediaTabs
          acutualSeasons={mediaData.number_of_seasons}
          tabData={data.seasons}
          type={type}
          id={id}
        />
      )}
      {mediaData.id && mediaData.images.backdrops[0] ? (
        <ImageSlider
          imageUrls={mediaData.images.backdrops.map((item) => {
            return `https://image.tmdb.org/t/p/original${item.file_path}`;
          })}
        />
      ) : (
        ""
      )}
    </div>
  );
}
