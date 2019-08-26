import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";

import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

//this query brings the data of the item that is going to be modified
const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

class UpdateItem extends Component {
  state = {};
  onChange = event => {
    const { name, type, value } = event.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
  updateItem = async (event, updateItem) => {
    event.preventDefault();
    const response = await updateItem({
      variables: { id: this.props.id, ...this.state }
    });
    console.log("updated ", response);
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {/*  im passing the GraphQL query to the Query component which is going to
        retrieve the data, as data, then that data can be used inside the render prop
        component*/}
        {({ data, loading }) => {
          //  this variable data is where the data landed after executing
          //  SINGLE_ITEM_QUERY in Query component
          if (loading) return <p>Loading</p>;

          //  and in case the query doesn't return any data (empty data.item)
          if (!data.item) return <p>There's no data for this ID</p>;

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={data.item}>
              {(updateItem, { error, loading }) => (
                <Form onSubmit={event => this.updateItem(event, updateItem)}>
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        onChange={this.onChange}
                      />
                    </label>
                    <label htmlFor="price">
                      Price
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        required
                        defaultValue={data.item.price}
                        onChange={this.onChange}
                      />
                    </label>
                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter a description"
                        required
                        defaultValue={data.item.description}
                        onChange={this.onChange}
                      />
                    </label>
                    <button type="submit">Save Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

UpdateItem.propTypes = {};

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
