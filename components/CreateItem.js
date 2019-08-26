import React, { Component } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import Router from "next/router";

import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "my shoes",
    description: "best shoes",
    image: "shoe.jpeg",
    largeImage: "largeshoe.jpeg",
    price: 10000
  };
  onChange = event => {
    const { name, type, value } = event.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  uploadFile = async event => {
    const files = event.target.files;
    console.log(files);
    let formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset","sickfits");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/felipelujan/image/upload",
      { method: "POST", body:formData }
    );
    const file = await res.json()
      console.log(file)
      this.setState({
          image:file.secure_url,
          largeImage: file.eager[0].secure_url
      })
  };
  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { error, loading }) => (
          <Form
            onSubmit={async event => {
              event.preventDefault();
              const res = await createItem();
              if ( this.state.largeImage ) {
                  Router.push({
                      pathname: "/item",
                      query: { id: res.data.createItem.id }
                  });
              };

            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  required
                  onChange={this.uploadFile}
                />
              </label>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
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
                  value={this.state.price}
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
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

CreateItem.propTypes = {};

export default CreateItem;
export {CREATE_ITEM_MUTATION}
