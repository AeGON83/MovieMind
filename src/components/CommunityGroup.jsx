import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CommunityGroup() {
  const { communityName } = useParams();
  const navigate = useNavigate();
  const navigateToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="community-group-main">
      <div className="community-nav">
        <div className="nav-title-wrapper">
          <div className="navbar-title">
            <div
              className="navbar-title-logo"
              onClick={navigateToHomepage}
            ></div>
          </div>
          <p>Communities</p>
        </div>
      </div>
      <div className="chat-container-main">
        <div className="chat-title-wrapper">
          <div className="community-chat-logo"></div>
          <p>{communityName}</p>
        </div>
      </div>
    </div>
  );
}
