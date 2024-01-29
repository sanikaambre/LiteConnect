// import React from "react";


// class AddContact extends React.Component {
//     state = {
//         name:"",
//         email:"",
//     }

//     add = (e) => {
//         e.preventDefault();
//         if(this.state.name === "" || this.state.email === ""){
//             alert("All fields are mandatory");
//             return
//         }

//         this.props.addContactHandler(this.state);
//         this.setState({name:"",email:""});
//         console.log(this.props);
        
//     }
//     render(){
//         return (
//           <div className="ui main">
//             <h2>Add Contact</h2>
//             <form className="ui form" onSubmit={this.add}>
//               <div className="field">
//                 <label htmlFor="">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="Enter Name"
//                   value={this.state.name}
//                   onChange={(e) => {
//                     this.setState({ name: e.target.value });
//                   }}
//                 />
//               </div>
//               <div className="field">
//                 <label htmlFor="">Email</label>
//                 <input
//                   type="text"
//                   name="email"
//                   placeholder="Enter Email"
//                   value={this.state.email}
//                   onChange={(e) => {
//                     this.setState({ email: e.target.value });
//                   }}
//                 />
//               </div>
//               <button className="ui button blue">Add</button>
//             </form>
//           </div>
//         );
//     }
// }

// export default AddContact;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddContact(props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone:"",
  });
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (state.name === "" || state.email === ""||state.email==="") {
      alert("All fields are mandatory");
      return;
    }

    props.addContactHandler(state);
    setState({ name: "", email: "",phone:"" });
    navigate('/');
  };

  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}>
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
        <button className="ui button blue">Add</button>
      </form>
    </div>
  );
}

export default AddContact;
