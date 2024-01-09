import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/contact.css";
import {
  clearError,
  clearMessage,
  contactFail,
  contactRequest,
  contactSuccess,
} from "../redux/reducers/otherSlice";
import axios from "axios";
import { server } from "../redux/store";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Contact = () => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [message, setmessage] = useState("");
  const {
    error,
    message: stateMessage,
    loading,
  } = useSelector((state) => state.other);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(contactRequest());
      const { data } = await axios.post(
        `${server}/contact`,
        { name, email, message },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(contactSuccess("Message Sent"));
      toast.success("Message Sent", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      dispatch(contactFail("Message Error"));
      toast.error("Message Error", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (stateMessage) {
      dispatch(clearMessage());
    }
  }, [dispatch, error, stateMessage]);
  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">Contact</h2>
      <form className="contact-form" onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter Name"
          value={name}
          className="contact-input"
          required
        />
        <br />
        <input
          type="email"
          onChange={(e) => setemail(e.target.value)}
          placeholder="Enter Email"
          value={email}
          className="contact-input"
          required
        />
        <br />

        <input
          type="text"
          onChange={(e) => setmessage(e.target.value)}
          placeholder="Enter Message"
          value={message}
          className="contact-input"
          required
        />
        <br />

        <button type="submit" className="btn mg-bt-sm2" disabled={loading}>
          {loading ? "loading" : "Send Mail"}
        </button>

     
      </form>
    </div>
  );
};

export default Contact;
