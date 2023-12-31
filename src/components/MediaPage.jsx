/** @format */

import { useEffect, useState } from "react";
import axios from "axios";

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
  const [isWatchListed, setIsWatchListed] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleFavoriteClick = async () => {
    if (!currentUser) {
      window.alert(
        `Please Log in to your Account to Add This To Your Favorites`
      );
      return;
    }

    https: try {
      let itemToAdd = { id, type };
      let fireBaseUid = currentUser.uid;
      const response = await axios.post(
        "https://moviemind-server.onrender.com/add-to-favorites",
        {
          fireBaseUid,
          itemToAdd,
          isFavorite,
        }
      );

      // Handle success
      setIsFavorite((old) => {
        return response.data.isAdded ? !old : old;
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
  const handleBookmarkClick = async () => {
    if (!currentUser) {
      window.alert(
        `Please Log in to your Account to Add this to Your WatchList`
      );
      return;
    }
    try {
      let itemToAdd = { id, type };
      let fireBaseUid = currentUser.uid;
      const response = await axios.post(
        "https://moviemind-server.onrender.com/add-to-watchlist",
        {
          fireBaseUid,
          itemToAdd,
          isWatchListed,
        }
      );

      // Handle success
      // console.log(response);
      setIsWatchListed((old) => {
        return response.data.isAdded ? !old : old;
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleRateClick = async (value) => {
    if (!currentUser) {
      window.alert(`Please Log in to your Account to Rate this Movie`);
      return;
    }
    try {
      let itemToAdd = { id, type, selectedRating: value };
      let fireBaseUid = currentUser.uid;
      const response = await axios.post(
        "https://moviemind-server.onrender.com/rate-media",
        {
          fireBaseUid,
          itemToAdd,
        }
      );

      // Handle success
      setSelectedRating(response.data.updatedTo);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
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

    // search already saved data
    if (currentUser) {
      axios
        .get("https://moviemind-server.onrender.com/search-media-data", {
          params: {
            fireBaseUid: currentUser.uid,
            id: id,
            type: type,
          },
        }) // Replace with your API endpoint
        .then((response) => {
          // setData(response.data);
          // console.log(response.data);

          setIsFavorite(response.data.favorited);
          setIsWatchListed(response.data.watchlisted);
          setSelectedRating(response.data.rated);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
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
                <Link
                  // to={`https://vidsrc.me/embed/${type}?tmdb=${id}`}
                  to={`/player/${id}`}
                  className="normal-button media-page-play-btn"
                >
                  <img src={whitePlayIcon} alt="" />
                  WATCH
                </Link>
                <button
                  className={`icon-button ${
                    isWatchListed ? "bookmark-btn-selected" : "bookmark-btn"
                  } `}
                  onClick={() => {
                    handleBookmarkClick();
                  }}
                ></button>
                <button
                  className={`icon-button ${
                    isFavorite ? "heart-btn-selected " : "heart-btn"
                  }`}
                  onClick={() => {
                    handleFavoriteClick();
                  }}
                >
                  {/* You can customize the button icon based on the favorite status */}
                  {/* {isFavorite ? "Added to Favorites" : "Add to Favorites"} */}
                </button>
                <div className="rating">
                  <div
                    className={selectedRating >= 10 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(10)}
                  ></div>
                  <div
                    className={selectedRating >= 9 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(9)}
                  ></div>
                  <div
                    className={selectedRating >= 8 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(8)}
                  ></div>
                  <div
                    className={selectedRating >= 7 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(7)}
                  ></div>
                  <div
                    className={selectedRating >= 6 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(6)}
                  ></div>
                  <div
                    className={selectedRating >= 5 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(5)}
                  ></div>
                  <div
                    className={selectedRating >= 4 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(4)}
                  ></div>
                  <div
                    className={selectedRating >= 3 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(3)}
                  ></div>
                  <div
                    className={selectedRating >= 2 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(2)}
                  ></div>
                  <div
                    className={selectedRating >= 1 ? "in-rate-range" : ""}
                    onClick={() => handleRateClick(1)}
                  ></div>
                </div>
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
