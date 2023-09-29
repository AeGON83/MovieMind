import React from "react";

export default function MovieCard() {
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <div className="movie-card">
      <div
        className="movie-card-left"
        onMouseOver={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/343086/h8fnwL1.png" />
      </div>
      <div
        className={`movie-card-right ${showDetails ? "show-card-details" : ""}`}
        onMouseOver={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <h1>KILL BILL: VOL. 1</h1>
        <div className="movie-card-right-details">
          <ul>
            <li>2003</li>
            <li>111 min</li>
            <li>Action</li>
          </ul>
          <div className="movie-card-right-review">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus
              blanditiis inventore m aliquam porro s quisquam enim natus? of
              their wedding rehearsal was gunned down by....
            </p>
            <a
              href="http://www.imdb.com/title/tt0266697/plotsummary?ref_=tt_stry_pl"
              target="_blank"
            >
              Read more
            </a>
          </div>
          <div className="movie-card-right-button">
            <a
              href="https://www.youtube.com/watch?v=ot6C1ZKyiME"
              target="_blank"
            >
              WATCH TRAILER
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
