import React from "react";
import Navbar from "./Navbar";
import marvelLogo from "../assets/catagory-imgs/viewers-marvel.png";
import dcLogo from "../assets/catagory-imgs/dc-logo.svg";
import hollywoodLogo from "../assets/catagory-imgs/hollywood-logo.svg";
import classicsLogo from "../assets/catagory-imgs/classics-logo.svg";
import sitcomLogo from "../assets/catagory-imgs/sitcom-logo.svg";
import scifiLogo from "../assets/catagory-imgs/sci-fi-logo.svg";
import westernLogo from "../assets/catagory-imgs/western-logo.svg";

export default function CommunityPage() {
  const communities = [
    {
      collectionName: "hollywoodCommunity",
      name: "Hollywood",
      url: "https://image.tmdb.org/t/p/w500/fHpWVib37vk3v8N6IKC6sBT5TcD.jpg",
      logo: hollywoodLogo,
      logoStyle: {
        scale: "0.7",
      },
    },
    {
      collectionName: "gotCommunity",
      name: "GOT Fans",
      url: "https://image.tmdb.org/t/p/w500/jJojoFmsuLPQz8AOdkeV0b686RN.jpg",
      logo: "https://image.tmdb.org/t/p/w500//mqOhYnLT7cRkYTY9dDEWfMxoQJS.png",
      logoStyle: {
        scale: "0.7",
      },
    },
    {
      collectionName: "marvelCommunity",
      name: "Marvel Fans",
      url: "https://www.themoviedb.org/t/p/w500/wMFad1v8SwyVvrKXmsIkLhSxCEC.jpg",
      logo: marvelLogo,
      logoStyle: {
        scale: "1.3",
      },
    },
    {
      collectionName: "dcCommunity",
      name: "DC Fans",
      url: "https://image.tmdb.org/t/p/w500/3xyth9V7S3hQJeKtfbSgvVf0Pry.jpg",
      logo: dcLogo,
    },
    {
      collectionName: "classicsCommunity",
      name: "Classics",
      url: "https://image.tmdb.org/t/p/w500/7d7RFBhnSMd9jhcOwmYkkcr7oFg.jpg",
      logo: classicsLogo,
      logoStyle: {
        scale: "0.7",
      },
    },
    {
      collectionName: "comedyCommunity",
      name: "Comedy & Sitcom",
      url: "https://image.tmdb.org/t/p/w500/ykDYy50mHU52PqYEu4xiFFOw5mw.jpg",
      logo: sitcomLogo,
      logoStyle: {
        scale: "0.5",
      },
    },
    {
      collectionName: "fictionCommunity",
      name: "Sci-fi",
      url: "https://image.tmdb.org/t/p/w500/kcF2iOIZwYVrLnEOyCY31j8pNhP.jpg",
      logo: scifiLogo,
      logoStyle: {
        scale: "0.6",
      },
    },
    {
      collectionName: "westernCommunity",
      name: "western",
      url: "https://image.tmdb.org/t/p/w500/3kjOh1sWjh54y6Lx8k5Mu9kAAGS.jpg",
      logo: westernLogo,
      logoStyle: {
        scale: "0.7",
      },
    },
  ];

  return (
    <div className="community-page">
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
      <div className="community-page-title-section">
        <div className="cp-left">
          <p className="media-overview">Community</p>
          <p className="media-logo-alt">MovieMind Communities</p>
          <p className="media-overview">
            Connect with movie lovers worldwide by joining our vibrant cinephile
            community. Share your love for cinema and interact with fellow
            enthusiasts across the globe.
          </p>
          <a className="normal-button">Explore</a>
        </div>
        <div className="cp-right"></div>
      </div>
      <div className="community-sections">
        {communities.map((item) => {
          return (
            <Community
              url={item.url}
              name={item.name}
              logo={item.logo}
              key={item.collectionName}
              collectionName={item.collectionName}
              logoStyle={item.logoStyle}
            />
          );
        })}
      </div>
    </div>
  );
}

function Community({ url, name, logo, collectionName, logoStyle }) {
  return (
    <div className="community-container">
      <div className="community-bg">
        <div className="community-logo">
          <img src={logo} style={logoStyle} alt="" />
        </div>
        <div
          className="community-details-main-wrapper"
          style={{
            background: `url(${url})`,
          }}
        >
          <div className="community-details-wrapper">
            <p className="community-details">{name}</p>
          </div>
        </div>
      </div>
      <div className="community-button"></div>
    </div>
  );
}
