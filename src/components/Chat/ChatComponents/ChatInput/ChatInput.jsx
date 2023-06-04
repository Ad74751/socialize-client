import React, { useDebugValue, useState } from "react";
import "./ChatInput.css";
import InputEmoji from "react-input-emoji";
function ChatInput({ user, sendMsg }) {
  const [text, setText] = useState("");
  const [ftype, setFType] = useState("");
  const [file, setFile] = useState();
  const send = () => {
    var datetime = new Date().toLocaleString();
    const message = {
      name: user.name,
      from: user.id,
      text: text,
      type: ftype,
      file: file,
      time: datetime,
    };
    sendMsg(JSON.stringify(message));
    setText("");
  };
  return (
    <div className="chatbox-input">
      <div className="dropdown">
        <i
          className="fas fa-paperclip"
          id="dropdownFile"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        ></i>
        <ul className="dropdown-menu" aria-labelledby="dropdownFile">
          <li>
            <input type="file" className="dropdown-item custom-file-input" />
          </li>
        </ul>
      </div>
      {/* <input
        value={text}
        onInput={(e) => {
          setText(e.target.value);
        }}
        type="text"
        placeholder="Type a message"
      /> */}
      <InputEmoji
        value={text}
        // onChange={(e) => {
        //   setText(e.target.value);
        // }}
        onInput={(e) => {
          setText(e.target.value);
        }}
        cleanOnEnter
        // onEnter={(e) => {
        //   setText(e.target.value);
        // }}
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
