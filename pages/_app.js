import App, { Container } from "next/app";
import Page from "../components/Page";
import React from "react";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";
class MyApp extends App {
  //  getInitialProps es un método especial de NEXT, lo que retorna para al render() por props
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    //this exposes the number of the page to the user
    //  examples in docs nextJS and apollo
    pageProps.query = ctx.query;
    return { pageProps };
  }
  render() {
    //  pageprops viene de getInitialProps
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps}> </Component>
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}
export default withData(MyApp);
