import { useEffect, useState } from "react";
import Badge from "./Badge";

export default function MediaBackground({ id }) {
  const [opacity, setOpacity] = useState(1);
  const [mediaData, setMediaData] = useState({});

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_TMDB_API_KEY,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}?append_to_response=images&language=en`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMediaData(response);
      })
      .catch((err) => console.error(err));
  }, []);

  function onScroll(e) {
    if (window.scrollY > 140) {
      return;
    }

    if (window.scrollY < 10) {
      setOpacity(1);
      return;
    }

    let nOpacity = 100 - window.scrollY / 2;

    if (nOpacity < 50) {
      nOpacity = 50;
    }

    setOpacity(nOpacity / 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
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
    <div className="media-back">
      {mediaData.id && (
        <div
          className="media-backdrop"
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${mediaData.backdrop_path}')`,
            opacity: opacity,
          }}
        ></div>
      )}

      {mediaData && (
        <div
          className="backdrop-details"
          style={{
            zIndex: 10,
            justifyContent: "flex-end",
            paddingBottom: "310px",
          }}
        >
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

          {mediaData.images && mediaData.images.logos ? (
            <img
              style={{ height: "150px", maxWidth: "70%" }}
              className="media-logo"
              src={`https://image.tmdb.org/t/p/original${mediaData.images.logos[0].file_path}`}
            />
          ) : (
            <p className="media-logo-alt">{mediaData.title}</p>
          )}

          {mediaData.tagline && (
            <p className="media-tagline">{mediaData.tagline.toUpperCase()}</p>
          )}

          {/* <p
            className="media-overview"
            // style={{
            //   marginBottom: "35%",
            // }}
          >
            {mediaData.overview}
          </p> */}
        </div>
      )}
    </div>
  );
}
