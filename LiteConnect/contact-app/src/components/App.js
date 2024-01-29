import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import api from "../api/contact";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";
import Login from "./Login";
import Register from "./Register";


function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState(() => {
    const retrieveContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    return retrieveContacts || [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [updatedContact, setUpdatedContact] = useState({});
  const [DContact, setDContact] = useState({});


  const retrieveContacts = async () => {
    const myValue = localStorage.getItem("userId");

    const headers = {
      "X-My-Value": myValue,
    };
    const response = await api.get("/api/contacts",{headers});
    return response.data;
  };


  const addContactHandler = async (contact) => {
    const request = {
      id: localStorage.getItem("userId"),
      ...contact,
    };
    const response = await api.post("/api/contacts", request);
    setContacts([...contacts, response.data]);
  };


  const updateContactHandler = async (contact) => {
     const myValue = localStorage.getItem("userId");
     const headers = {
       "X-My-Value": myValue,
     };
    const response = await api.put(`/api/contacts/${contact.id}`, contact,{headers});
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  
  const editContact = (contact) => {
    setUpdatedContact(contact);
  };


  const removeContactHandler = async (id) => {
    const myValue = localStorage.getItem("userId");
    const headers = {
      "X-My-Value": myValue,
    };
    await api.delete(`/api/contacts/${id}`,{headers});
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  
  const clickedContact = (contact) => {
    setDContact(contact);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else{
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
       
  }, [contacts]);

  
  return (
    <div className="ui container">
      <Router>
        <Header header={"Contact Manager"} />
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                getClickedContact={clickedContact}
                editContact={editContact}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
          <Route
            path="/edit"
            element={
              <EditContact
                updateContact={updatedContact}
                updateContactHandler={updateContactHandler}
              />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactDetail detailContact={DContact} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        {/* <AddContact addContactHandler={addContactHandler} />
        <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>
    </div>
  );
}

export default App;

// https://blog.logrocket.com/using-localstorage
