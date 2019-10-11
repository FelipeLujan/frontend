import React from 'react';
import PropTypes from 'prop-types';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

export const ADD_TO_CART = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => {
  return (
    <Mutation
      mutation={ADD_TO_CART}
      variables={{ id }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(addToCart, { loading }) => {
        return (
          <button disabled={loading} onClick={addToCart}>
            Add{loading ? 'ing' : ''} to cart
          </button>
        );
      }}
    </Mutation>
  );
};

AddToCart.propTypes = {};

export default AddToCart;
