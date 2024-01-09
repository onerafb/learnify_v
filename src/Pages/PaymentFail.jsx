import React from "react";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="container flex-column">
      <h2 className="mg-top mg-bt text-align-center">Sorry..</h2>
      <h3 className="mg-bt-sm2">Payment Fail !</h3>
      <h3 className="mg-bt-sm2">It seems like there is some network issues..</h3>
      <Link to="/">
        <button className="btn">Go to home</button>
      </Link>
    </div>
  );
};

export default PaymentFail;
