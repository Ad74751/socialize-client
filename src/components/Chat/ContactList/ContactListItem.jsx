import React from "react";
import axios from "../../../api/axios";
function ContactListItem({ contact }) {
  const imgUrl = `https://api.dicebear.com/6.x/pixel-art/svg?seed=`;
  const name = contact.split(":")[1];
  const id = contact.split(":")[0];

  const removeFriend = (uid) => {
    axios
      .get(`/user/deletecontact?userid=${uid}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((resp) => {
        if (resp.data.status === "ok") {
          alert("Friend Removed Succesfully");
        } else if (resp.data.status === "error") {
          alert(resp.data.msg);
        }
      });
  };
  return (
    <div className="chat-box">
      <div className="chat-details">
        <div className="text-head d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img className="avatar" src={imgUrl + name} alt={name} />
            <div className="d-flex flex-column justify-content-start ps-3">
              <h4>{name}</h4>
              <span>{id}</span>
            </div>
          </div>
          <div className="dropdown">
            <i
              className="fas fa-ellipsis-vertical"
              type="button"
              id="dropdownMenuButton"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            ></i>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  onClick={() => {
                    removeFriend(contact);
                  }}
                >
                  <i className="fas fa-trash"></i>
                  <span> Remove Friend</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactListItem;
