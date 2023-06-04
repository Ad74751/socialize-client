import React, { useEffect, useState } from "react";
import ChatListItem from "../ChatListItem/ChatListItem";
import axios from "../../../../api/axios";
function ChatList({ socket, setConv }) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    axios
      .get("/user/coversations", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setConversations(resp.data.conversations);
      });
    // socket.on("new:conversation", (msg) => {
    //   setConversations((conversations) => [...conversations, msg.conversation]);
    // });
    // socket.on("delete:contact", (msg) => {
    //   setContacts(msg.contact);
    // });
  }, [setConv]);
  return conversations.length > 0 ? (
    <div className="chat-list">
      {conversations &&
        conversations.map((c,i) => {
          return <ChatListItem key={i} conv={c} setConv={setConv} socket={socket} />;
        })}
    </div>
  ) : (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h2 className="lead">No conversations found...</h2>
    </div>
  );
}

export default ChatList;
