import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { msgUserRef } from "./user/AuthContext";

export default function CommunityGroup() {
  const [msgData, setMsgData] = useState({ message: "Hello from the server!" });
  const { communityName } = useParams();

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
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours || 12;

    const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${ampm}`;

    return `${formattedTime} ${formattedDate}`;
  }

  const [postMsgData, setPostMsgData] = useState({
    msg: "",
    name: "rajan",
    uid: "123456",
    // uid: msgUserRef.uid,
    // name: msgUserRef.name,
    time: "",
    collectionName: communityName,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostMsgData({ ...postMsgData, [name]: value });
  };

  const handlePostRequest = async () => {
    if (postMsgData.msg == "") {
      return;
    }

    setPostMsgData((old) => {
      return {
        ...old,
        time: formatDateAndTime(new Date()),
      };
    });

    try {
      const response = await fetch("http://localhost:5000/add-to-array", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postMsgData),
      });

      if (response.ok) {
        console.log("Data added successfully");
        // You can update your UI or show a success message here
      } else {
        console.error("Error adding data");
        // Handle the error appropriately
      }
    } catch (error) {
      console.error("Network error:", error);
      // Handle network errors
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
        <div className="chat-msg-container">
          {/* <SingleMessage />
          <SingleMessage />
          <SingleMessage /> */}
          {msgData.length > 0 &&
            msgData
              .filter((item) => item.name == communityName)[0]
              .msgs.map((item) => {
                return (
                  <SingleMessage
                    msg={item.msg}
                    side={item.name == "rajan" ? "right-msg" : "left-msg"}
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
          <button onClick={handlePostRequest}>Submit</button>
        </div>
      </div>
    </div>
  );
}

function SingleMessage({ msg, side }) {
  return (
    <div className={`msg ${side}`}>
      <span className="msg-text">{msg}</span>
    </div>
  );
}
