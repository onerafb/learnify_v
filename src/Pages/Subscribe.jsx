import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../redux/store";
import {
  buySubscriptionFail,
  buySubscriptionRequest,
  buySubscriptionSuccess,
  clearError,
} from "../redux/reducers/userSlice";
import logo from "../assets/logo.jpg";
import { toast } from "react-toastify";

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();

  const [key, setkey] = useState("");

  const { loading, error, subscriptionId } = useSelector(
    (state) => state.subscription
  );
  const { error: courseError } = useSelector((state) => state.course);

  const subscribeHandler = async () => {
    const { data } = await axios.get(`${server}/razorpaykey`);
    setkey(data.key);

    try {
      dispatch(buySubscriptionRequest());
      const { data } = await axios.get(`${server}/subscribe`, {
        withCredentials: true,
      });

      dispatch(buySubscriptionSuccess(data.subscriptionId));
    } catch (error) {
      dispatch(buySubscriptionFail("Subscription failed"));
      toast.error("Subscription failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (courseError) {
      dispatch(clearError());
    }
    if (subscriptionId) {
      const opoenPopUp = () => {
        const options = {
          key,
          name: "Learnify",
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: "Learnify",
          },
          theme: {
            color: "#FFC800",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      opoenPopUp();
    }
  }, [
    dispatch,
    error,
    courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);
  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">Welcome</h2>
      <p className="mg-bt-sm2">Pro Pack : 999rs</p>
      <p className="mg-bt-sm2 text-align-center">
        Join pro program and get access to all exclusive content.
      </p>
      <h3 className="mg-bt-sm2">999rs Only</h3>
      <button
        onClick={subscribeHandler}
        className="btn mg-bt-sm2"
        disabled={loading}
      >
        {loading ? "loading" : "Buy Now"}
      </button>
      <div className="sub-mid-three">100% REFUND ON CANCELLATION</div>
    </div>
  );
};

export default Subscribe;
