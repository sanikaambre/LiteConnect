import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = (props) => {
  //global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ui segment">
      <div className="ui center aligned header">
        <h2>{props.header}</h2>
        {!isLogin && (
          <>
            <button className="ui primary button">
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
            </button>
            <button className="ui button">
              <Link to="/register">Register</Link>
            </button>
          </>
        )}
        {isLogin && (
          <button className="ui red button" onClick={handleLogout}>
            <Link to="/login" style={{color:"white"}}>Logout</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
