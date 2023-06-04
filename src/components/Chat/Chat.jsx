import React, { useEffect, useState } from "react";
import ChatList from "./ChatComponents/ChatList/ChatList";
import ChatContainer from "./ChatComponents/ChatContainer/ChatContainer";
import "./Chat.css";
import ChatInput from "./ChatComponents/ChatInput/ChatInput";
import axios from "../../api/axios";
import { socket } from "../../socket.io/socket";
import AddFriend from "./AddFriend/AddFriend";
import Conversation from "./Conversation/Conversation";
import ContactList from "./ContactList/ContactList";
function Chat() {
  const [user, setUser] = useState({ name: null, email: null });
  const [currentConversation, setCurrentConversation] = useState({ name: "" });
  const [page, setPage] = useState(0);
  const imgUrl = `https://api.dicebear.com/6.x/pixel-art/svg?seed=`;

  useEffect(() => {
    getUser();
    socket.connect();
  }, []);
  const getUser = async () => {
    await axios
      .get("/user", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setUser(resp.data.user);
      });
  };
  const setConversation = async (convid) => {
    await axios
      .get(`/user/getcoversation?convid=${convid}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setCurrentConversation(resp.data.conversation);
      });
  };
  const sendMessages = (msg) => {
    console.log({ room: currentConversation._id, message: msg });
    socket.emit("send-message", {
      room: currentConversation._id,
      message: msg,
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div>
      <div className="main-container">
        <div className="left-container">
          <div className="header">
            <div className="dropdown">
              <div
                className="user-img"
                id="dropdownMenuButton1"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <img className="dp" src={imgUrl + user["name"]} alt="" />
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <b className="dropdown-item fw-bold">
                    Hello {user["name"]} 👋
                  </b>
                </li>
                <li>
                  <b className="dropdown-item fw-bold">{user["email"]}</b>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item btn">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
            <div className="nav-icons">
              <li
                onClick={() => {
                  setPage(0);
                }}
                className="d-flex align-items-center"
              >
                <i className={page === 0 ?"fas fa-message text-primary":"fas fa-message"}></i>
              </li>
              <li>
                <i
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  <i className={page === 1 ?"fas fa-users text-primary":"fas fa-users"}></i>
                </i>
              </li>
              <li>
                <i>
                  <div className="dropdown">
                    <div
                      id="dropDown2"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-vertical"></i>
                    </div>
                    <ul className="dropdown-menu" aria-labelledby="dropDown2">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          data-mdb-toggle="modal"
                          data-mdb-target="#exampleModal"
                        >
                          Add Friends +
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          data-mdb-toggle="modal"
                          data-mdb-target="#conversationModal"
                        >
                          New Conversation +
                        </button>
                      </li>
                    </ul>
                  </div>
                </i>
              </li>
              <li></li>
            </div>
          </div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <AddFriend socket={socket} />
          </div>
          <div
            className="modal fade"
            id="conversationModal"
            tabIndex="-1"
            aria-labelledby="conversationModalLabel"
            aria-hidden="true"
          >
            <Conversation socket={socket} />
          </div>

          <div className="search-container w-100">
            <div className="input">
              <input
                className="w-100"
                type="text"
                placeholder="🔎 Search or start new chat"
              />
            </div>
          </div>
          {page === 0 ? (
            <ChatList
              socket={socket}
              setConv={(e) => {
                setConversation(e);
              }}
            />
          ) : (
            <ContactList socket={socket} />
          )}
        </div>

        <div className="right-container">
          <ChatContainer
            conv={currentConversation}
            user={user}
            socket={socket}
          />
          <ChatInput
            conv={currentConversation}
            user={user}
            sendMsg={(e) => {
              sendMessages(e);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;
