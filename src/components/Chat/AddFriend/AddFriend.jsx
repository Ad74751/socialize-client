import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
function AddFriend({ socket }) {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    getUsers();
    socket.on("new:contact", (msg) => {
      setContacts((contacts) => [...contacts, msg.contact]);
    });
    socket.on("delete:contact", (msg) => {
      setContacts(msg.contact);
    });
  }, []);
  const getUsers = async () => {
    await axios
      .get("/user/all", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setUsers(resp.data.users);
      });
    await axios
      .get("/user/contacts", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        setContacts(resp.data.contacts);
      });
  };
  const addFriend = (uid) => {
    axios
      .get(`/user/addcontact?userid=${uid}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        if (resp.data.status === "ok") {
          alert("Friend Added Succesfully");
        } else if (resp.data.status === "error") {
          alert(resp.data.msg);
        }
      });
  };
  return (
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            <b>Add Friends</b>
          </h5>
          <button
            type="button"
            className="btn-close"
            data-mdb-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <ul className="list-group list-group-flush">
            {users.map((user, i) => {
              return (
                <li className="list-group-item" key={i}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img
                        className="avatar"
                        src={
                          "https://api.dicebear.com/6.x/pixel-art/svg?seed=" +
                          user.name
                        }
                        alt={user.name}
                      />
                      <div className="d-flex flex-column align-items-start ms-3">
                        <span className="lead fw-bold">{user.name}</span>
                        <span>{user.id}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addFriend(user.id);
                      }}
                      className={
                        contacts.indexOf(user.id + ":" + user.name) !== -1
                          ? "btn btn-primary disabled"
                          : "btn btn-primary"
                      }
                    >
                      Add
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddFriend;
