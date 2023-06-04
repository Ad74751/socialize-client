import React from "react";
import "./ChatListItem.css";
import axios from "../../../../api/axios";
function ChatListItem({ conv, setConv, socket }) {
  const deleteConv = (id) => {
    axios
      .get(`/user/conversation/delete?convid=${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        if (resp.data.status === "ok") {
          alert(resp.data.msg);
        } else {
          alert(resp.data.msg);
        }
      });
  };
  return (
    <div
      className="chat-box"
      onClick={() => {
        setConv(conv.split(":")[0]);
        socket.emit("join-conversation", conv.split(":")[0]);
      }}
    >
      <div className="chat-details">
        <div className="text-head d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="user-img">
              <img
                className="dp"
                src={
                  "https://api.dicebear.com/6.x/initials/svg?seed=" +
                  conv.split(":")[1]
                }
                alt="..."
              />
            </div>
            <span className="ms-2 lead fw-bold">{conv.split(":")[1]}</span>
          </div>
          <div className="dropdown">
            <div
              id="dropDown3"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-vertical"></i>
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropDown3">
              <li>
                <button
                  onClick={() => {
                    deleteConv(conv.split(":")[0]);
                  }}
                  className="btn dropdown-item"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatListItem;
