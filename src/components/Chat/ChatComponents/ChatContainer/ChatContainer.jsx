import React, { useEffect, useState } from "react";
import "./ChatContainer.css";
import ChatBubble from "../ChatBubble/ChatBubble";
function ChatContainer({ conv, user, socket }) {
  const [msg, setMsg] = useState([]);
  useEffect(() => {
    setMsg(conv.messages);
  }, [conv]);
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      setMsg((msg) => [...msg, data.msg]);
    });
  }, []);

  return (
    <>
      <div className="header d-flex align-items-center">
        <div className="img-text">
          {conv.name !== "" ? (
            <>
              <div className="user-img">
                <img
                  className="dp"
                  src={
                    "https://api.dicebear.com/6.x/initials/svg?seed=" +
                    conv.name
                  }
                  alt="..."
                />
              </div>
              <span className="lead fw-bold ms-2">{conv.name}</span>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="nav-icons"></div>
      </div>

      {conv.name !== "" ? (
        <div className="chat-container">
          {msg &&
            msg.map((m, i) => {
              return <ChatBubble key={i} msg={m} user={user} />;
            })}
        </div>
      ) : (
        <div
          id="display-text"
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <h2 className="heading-4">
            Select a conversation to start chatting...
          </h2>
        </div>
      )}
    </>
  );
}

export default ChatContainer;
