import React from "react";
import {Link} from "react-router-dom";
const ContactCard = (props) => {
    const {name,email,phone} = props.contact;
    const id = props.contact._id;
    return (
      <div className="item">
        <i className="large user circle icon"></i>
        <div
          className="content"
          onClick={() => props.getClickContact(props.contact)}
        >
          <Link
            to={{
              pathname: `/contact/${id}`,
              state: { contact: props.contact },
            }}
          >
            <div className="header">{name}</div>
            <div>{email}</div>
            <div>{phone}</div>
          </Link>
        </div>
        <i
          className="large trash alternate outline icon "
          style={{
            color: "red",
            marginTop: "7px",
          }}
          onClick={() => {
            props.clickHandler(id);
          }}
        ></i>
        <Link
          to={{
            pathname: `/edit`,
            state: { contact: props.contact },
          }}
        >
          <i
            className=" large edit alternate outline icon "
            style={{ color: "blue", marginTop: "7px" }}
            onClick={()=>props.updateContact(props.contact)}
          ></i>
        </Link>
      </div>
    );
}

export default ContactCard;