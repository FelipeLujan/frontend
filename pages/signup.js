import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Signup from "../components/Signup";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minMax(300px, 1fr));
  grid-gap: 20px;
`;
const SignupPage = props => {
  return (
    <Columns>
      <Signup></Signup>
      <Signup></Signup>
      <Signup></Signup>
    </Columns>
  );
};

SignupPage.propTypes = {};

export default SignupPage;
