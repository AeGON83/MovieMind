import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./user/AuthContext";

export default function CommunityGroup() {
  let { currentUser } = useAuth();
  const [msgData, setMsgData] = useState({ message: "Hello from the server!" });
  const { communityName } = useParams();
  const messageSectionRef = useRef(null);

  const scrollToBottom = () => {
    if (messageSectionRef.current) {
      messageSectionRef.current.scrollTop =
        messageSectionRef.current.scrollHeight;
    }
  };

  const navigate = useNavigate();
  const navigateToHomepage = () => {
    navigate("/");
  };

  function formatDateAndTime(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear() % 100;

    const formattedDate = `${day}/${month}/${year < 10 ? `0${year}` : year}`;

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours || 12;

    const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }${ampm}`;

    return `${formattedTime} ${formattedDate}`;
  }

  const [postMsgData, setPostMsgData] = useState(
    currentUser
      ? {
          msg: "",
          name: currentUser.displayName,
          uid: currentUser.uid,
          collectionName: communityName,
        }
      : {}
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostMsgData({ ...postMsgData, [name]: value });
  };

  const handlePostRequest = async () => {
    if (postMsgData.msg == "") {
      return;
    }

    try {
      await fetch("http://localhost:5000/add-to-array", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...postMsgData,
          time: formatDateAndTime(new Date()),
        }),
      });
      scrollToBottom();
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    // Establish a WebSocket connection
    const socket = new WebSocket(`ws://localhost:5000`);

    socket.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setMsgData(updatedData);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => scrollToBottom(), [msgData]);

  return (
    <div className="check-login">
      {currentUser != null ? (
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
            <div className="chat-msg-container" ref={messageSectionRef}>
              {/* <SingleMessage />
          <SingleMessage />
          <SingleMessage /> */}
              {msgData.length > 0 &&
                msgData
                  .filter((item) => item.name == communityName)[0]
                  .msgs.map((item, index) => {
                    // console.log(item);
                    return (
                      <SingleMessage
                        name={item.name}
                        key={item.uid + index}
                        msg={item.msg}
                        time={item.time}
                        side={
                          item.uid == currentUser.uid ? "right-msg" : "left-msg"
                        }
                      />
                    );
                  })}
            </div>
            <div className="msg-sender">
              <input
                type="text"
                value={postMsgData.msg}
                name="msg"
                onChange={handleInputChange}
                placeholder="Enter Message"
              />
              <button onClick={handlePostRequest}></button>
            </div>
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
            Please Log in first To chat in Community
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

function SingleMessage({ msg, side, time, name }) {
  return (
    <div className={`msg ${side}`}>
      <span className="msg-text">{msg}</span>
      <p className="msg-time-stamp">{time}</p>
      <p
        className="msg-time-stamp"
        style={{ display: `${side == "right-msg" ? "none" : "initial"}` }}
      >
        {name}
      </p>
    </div>
  );
}
