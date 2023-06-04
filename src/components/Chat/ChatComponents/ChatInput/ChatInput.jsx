import React, { useDebugValue, useState } from "react";
import "./ChatInput.css";
function ChatInput({ user, sendMsg }) {
  const [text, setText] = useState("");
  const send = () => {
    var datetime = new Date().toLocaleString();
    const message = {
      name: user.name,
      from: user.id,
      text: text,
      time: datetime,
    };
    sendMsg(JSON.stringify(message));
    setText("");
  };
  return (
    <div className="chatbox-input">
        <i
          className="fas fa-paperclip"
        ></i>
       
      <input
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
        type="text"
        placeholder="Type a message"
      /> 
      <i
        className="far fa-paper-plane"
        onClick={() => {
          send();
        }}
      ></i>
    </div>
  );
}

export default ChatInput;
