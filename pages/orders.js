import React from "react";
import PropTypes from "prop-types";
import PleaseSignIn from "../components/pleaseSignIn";
import OrderList from "../components/Orders";

const Orders = props => {
  return (
    <PleaseSignIn>
      <OrderList> </OrderList>
    </PleaseSignIn>
  );
};

Orders.propTypes = {};

export default Orders;
