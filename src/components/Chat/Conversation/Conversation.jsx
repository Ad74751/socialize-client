import React, { useEffect, useRef, useState } from "react";
import axios from "../../../api/axios";

function Conversation({ socket }) {
  const [contacts, setContacts] = useState([]);
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const ref = useRef([]);

  useEffect(() => {
    axios
      .get("/user/contacts", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setContacts(resp.data.contacts);
      });
    socket.on("new:contact", (msg) => {
      setContacts((contacts) => [...contacts, msg.contact]);
    });
    socket.on("delete:contact", (msg) => {
      setContacts(msg.contact);
    });
  }, []);
  const Unchecked = () => {
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
  };
  const newConversation = (e) => {
    e.preventDefault();
    axios
      .post(
        "/user/conversation/new",
        {
          convname: name,
          members: members.toString(),
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      )
      .then((resp) => {
        if (resp.data.status == "ok") {
          alert(resp.data.msg);
        } else {
          alert("Error");
        }
      });
    setName("");
    setMembers([]);
    Unchecked();
  };
  const changeMembers = (memb) => {
    if (members.indexOf(memb) !== -1) {
      setMembers((m) => m.filter((mb) => mb !== memb));
    } else {
      setMembers((m) => [...m, memb]);
    }
  };
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="conversationModalLabel">
            <b>Create Conversation</b>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
            onClick={() => {
              setMembers([]);
            }}
          ></button>
        </div>
        <div className="modal-body">
          <form
            onSubmit={(e) => {
              newConversation(e);
            }}
          >
            <div className="mb-3">
              <div className="form-outline">
                <input
                  value={name}
                  onInput={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  id="convName"
                  className="form-control"
                  maxLength={20}
                />
                <label className="form-label" htmlFor="convName">
                  Conversation Name
                </label>
              </div>
            </div>
            <div className="mb-3">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-mdb-toggle="collapse"
                      data-mdb-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <div className="form-outline">
                        <p>Select Members</p>
                        <input
                          type="text"
                          id="convMembers"
                          className="form-control"
                          value={members}
                          onChange={() => {}}
                        />
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-mdb-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul className="list-group list-group-light">
                        {contacts.map((user, i) => {
                          return (
                            <li className="list-group-item" key={i}>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                  <img
                                    className="avatar"
                                    src={
                                      "https://api.dicebear.com/6.x/pixel-art/svg?seed=" +
                                      user.split(":")[1]
                                    }
                                    alt={user.split(":")[1]}
                                  />
                                  <div className="d-flex flex-column align-items-start ms-3">
                                    <span className="lead fw-bold">
                                      {user.split(":")[1]}
                                    </span>
                                    <span>{user.split(":")[0]}</span>
                                  </div>
                                </div>
                                <div className="form-check">
                                  <input
                                    ref={(element) => {
                                      ref.current[i] = element;
                                    }}
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckDefault"
                                    onChange={() => {
                                      changeMembers(user);
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault"
                                  ></label>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={members.length !== 0 && name !== "" ? false : true}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
