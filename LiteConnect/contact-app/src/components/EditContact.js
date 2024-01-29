import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditContact(props) {
  //  console.log(props.updateContact)
  const [state, setState] = useState({
    id:props.updateContact.id,
    name: props.updateContact.name,
    email: props.updateContact.email,
    phone:props.updateContact.phone
  });
  const navigate = useNavigate();

  const update = (e) => {
    e.preventDefault();
    if (state.name === "" || state.email === ""|| state.phone ==="") {
      alert("All fields are mandatory");
      return;
    }

    props.updateContactHandler({...state,id:props.updateContact._id});
    setState({ name: "", email: "",phone:"" });
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={state.name}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={state.email}
            onChange={(e) => {
              setState({ ...state, email: e.target.value });
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="">Contact Number</label>
          <input
            type="text"
            name="number"
            placeholder="Enter Phone Number"
            value={state.phone}
            onChange={(e) => {
              setState({ ...state, phone: e.target.value });
            }}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}

export default EditContact;
