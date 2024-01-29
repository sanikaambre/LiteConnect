import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [inputs ,setInputs] = useState({
        username:"",
        email:"",
        password:"",
    });

    const handleChange = (e) => {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            fetch("http://localhost:5001/api/users/register", {
              method: "POST",

              body: JSON.stringify({
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
              }),

              headers: {
                "Content-type": "application/json",
              },
            });
            navigate("/login");
        }catch(err){
            console.log(`HandleSubmit Register is giving error ${err}`);
        }
    }
  return (
    <div className="container">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={inputs.username}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <div className="field"></div>
        <button className="ui primary button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
