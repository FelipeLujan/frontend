import Link from "next/link";
import CreateItem from "../components/CreateItem";
import React from "react";
import PleaseSignIn from "../components/pleaseSignIn";
import Order from "../components/Order";

const OrderPage = props => {
  return (
    <PleaseSignIn>
      <Order id={props.query.id}></Order>
    </PleaseSignIn>
  );
};

export default OrderPage;
