import React,{useRef} from "react";
import ContactCard from "./ContactCard";
import {Link} from "react-router-dom";

const ContactList = (props) => {

    let isLogin = localStorage.getItem("userId");

    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
      props.getContactId(id);
    };

    const clickContact = (contact) => {
      props.getClickedContact(contact);
    }

    const updateContact = (contact) => {
       props.editContact(contact);
    }

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    }
   
     const renderContactList = props.contacts.map((contact)=>{
        return (
          <>
            <ContactCard
              contact={contact}
              clickHandler={deleteContactHandler}
              getClickContact = {clickContact}
              updateContact = {updateContact}
            />
          </>
        );
     });
  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          {isLogin ? (
            <button className="ui button blue right floated">
              Add Contact
            </button>
          ) : (
            <button className="ui button blue right floated disabled">
              Add Contact
            </button>
          )}
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contact"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui relaxed celled list">{renderContactList}</div>
    </div>
  );

}

export default ContactList