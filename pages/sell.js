import Link from "next/link";
import CreateItem from "../components/CreateItem";
import React from "react";
import PleaseSignIn from "../components/pleaseSignIn";

const Sell = props => {
  return (
    <PleaseSignIn>
      <CreateItem />
    </PleaseSignIn>
  );
};

export default Sell;
