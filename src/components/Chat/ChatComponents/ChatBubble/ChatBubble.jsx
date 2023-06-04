import React from "react";

function ChatBubble({ user, msg }) {
  const message = JSON.parse(msg);
  const userid = user.id;

  return message.from === userid ? (
    <div className="message-box my-message">
      <p>
        {message.text}
        <br />
        <span>{message.time}</span>
      </p>
    </div>
  ) : (
    <div className="message-box friend-message">
      <p className="text-start">
        <div className="d-flex justify-content-between">
          <img
            src={"https://api.dicebear.com/6.x/pixel-art/svg?seed="+message.name}
            alt=".."
            className="chat-bubble-avatar"
          />
          <b className="text-center ms-3">{message.name}</b>
          <p></p>
        </div>
        {message.text}
        <br />
        <span>{message.time}</span>
      </p>
    </div>
  );
}

export default ChatBubble;
