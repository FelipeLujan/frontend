import React from "react";
import PleaseSignIn from "../components/pleaseSignIn";
import Permissions from "../components/Permissions";

const PermissionsPage = props => {
  return (
    <PleaseSignIn>
      <Permissions></Permissions>
    </PleaseSignIn>
  );
};

export default PermissionsPage;
