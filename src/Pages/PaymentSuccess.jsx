import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import celebrate from "../assets/celebrate.gif";
import "../styles/paymentsuccess.css";
const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get("");
  // console.log(reference);
  return (
    <div className="container flex-column">
      <div className="con-sub">
        <h2 className="mg-top mg-bt text-align-center">Congratulations...</h2>
        <h3 className="mg-bt-sm2">Payment Successful.</h3>
        <p className="p1 mg-bt-sm2">
          Congratulation you'r a premium member now.
        </p>
        <FaRegCheckCircle className="icon-big mg-bt-sm2" />
        <Link to="/profile" className="pay-suc-link">
          <button className="btn">Go to Profile</button>
        </Link>
        <h4 className="mg-top">Reference : {reference}</h4>
      </div>
    </div>
  );
};

export default PaymentSuccess;
