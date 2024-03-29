import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import PropTypes from "prop-types";
import Header from "./Header";
import Meta from "./Meta";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

injectGlobal`
@font-face {
font-family: 'rednika_next';
src: url("../static/radnikanext-medium-webfont.woff2");
format('woff2');
font-weight: normal;
font-style: normal;
}
html{
box-sizing: border-box;
font-size: 10px;
*, *:before, *:after{
box-sizing: inherit}
}
body{
padding: -0px;
margin: -0px;
font-size: 1.5rem;
line-height: 2;
font-family: 'rednika_next';
}

a{
text-decoration: none;
color: ${theme.black};
}

`;

const StyledPage = styled.div`
  background: white;
  color: black;
`;

const Inner = styled.div`
  min-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

Page.propTypes = {};

export default Page;
