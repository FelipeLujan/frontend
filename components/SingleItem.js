import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import DisplayError from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;
const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    font-size: 2rem;
    margin: 3rem;
  }
`;
class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <DisplayError error={error} />;
          if (loading) return <p>loading</p>;
          if (!data.item) {
            return <p>no item found for this id </p>;
          }
          console.log(data);
          return (
            <SingleItemStyles>
              <Head>
                <title>Sick fits | {data.item.title}</title>
              </Head>
              <img src={data.item.largeImage} />
              <div>
                <h2>Viewing {data.item.title}</h2>
                <p>{data.item.description}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
