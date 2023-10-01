import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Badge from "./Badge";
import Loading from "./Loading";
import ImageSlider from "./ImageSlider";
import { useParams } from "react-router-dom";
import whitePlayIcon from "../assets/icons/play-icon-white.png";

export default function MediaPage() {
  const [mediaData, setMediaData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=images,peoples&language=en`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMediaData(response);
      })
      .catch((err) => console.error(err));
  }, []);

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
          style={{
            backgroundColor: "#01010177",
            position: "absolute",
            top: 0,
            opacity: 1,
            zIndex: 2,
          }}
        />
        {mediaData.id ? (
          <>
            <img
              className="backdrop-img"
              src={`https://image.tmdb.org/t/p/original${
                mediaData.backdrop_path || "b3JtLWrdiJFCN8r9zuftgty8ddD.jpg"
              }`}
              alt="err getting image"
            />

            <div className="backdrop-details">
              <ul className="media-rating-list">
                <li>
                  <div className="star-icon"></div>
                  {mediaData.vote_average
                    ? `${mediaData.vote_average}`.substr(0, 3)
                    : "n/a"}
                </li>
                <li>
                  {mediaData.release_date
                    ? mediaData.release_date.substr(0, 4)
                    : "n/a"}
                </li>
                <li>
                  {mediaData.runtime
                    ? `${Math.floor(mediaData.runtime / 60)}h ${
                        mediaData.runtime % 60
                      }m`
                    : ""}
                </li>
              </ul>

              {mediaData.images.logos[0] ? (
                <img
                  className="media-logo"
                  src={`https://image.tmdb.org/t/p/original${mediaData.images.logos[0].file_path}`}
                />
              ) : (
                <p className="media-logo-alt">{mediaData.title}</p>
              )}

              {mediaData.tagline && (
                <p className="media-tagline">
                  {mediaData.tagline.toUpperCase()}
                </p>
              )}
              <ul className="media-rating-list media-genere-list">
                {mediaData.genres
                  ? mediaData.genres.map((item, index) => {
                      return (
                        <Badge
                          key={index}
                          text={item.name}
                          color={makeBadgeColor(index)}
                        />
                      );
                    })
                  : ""}
              </ul>
              <p className="media-overview">{mediaData.overview}</p>
              <div className="media-page-actions">
                <button className="normal-button media-page-play-btn">
                  <img src={whitePlayIcon} alt="" />
                  WATCH
                </button>
                <div className="icon-button bookmark-btn"></div>
                <div className="icon-button heart-btn"></div>
              </div>
            </div>
          </>
        ) : (
          <Loading />
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
    </div>
  );
}
