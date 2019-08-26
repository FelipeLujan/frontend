import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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

class SingleItem extends Component {
  render() {
    return <div>Single Item component !!!!¡¡¡ {this.props.id}</div>;
  }
}

export default SingleItem;
