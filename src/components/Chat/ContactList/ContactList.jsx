import { React, useState, useEffect } from "react";
import axios from "../../../api/axios";
import ContactListItem from "./ContactListItem";
function ContactList({ socket }) {
  const [contacts, setContacts] = useState([]);
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
  return contacts.length > 0 ? (
    <div className="chat-list">
      {contacts.map((c, i) => {
        return <ContactListItem contact={c} key={i} />;
      })}
    </div>
  ):(
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h2 className="lead">No contacts found...</h2>
    </div>
  )
}

export default ContactList;
