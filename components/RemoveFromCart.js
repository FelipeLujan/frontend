import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Mutation } from 'react-apollo';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  bottom: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;
const RemoveFromCart = props => {
  console.log(props);
  const update = (cache, payload) => {
    //  this update is called right after the response comes back from the server after the mutation
    //  is executed
    //  cache is apollo cache and payload is the response
    console.log('update called');
    //  1. read the cache
    //    2. remove item from cart
    //    3. write cache back
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    const cartItemId = payload.data.removeFromCart.id;
    data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);

    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  };
  return (
    <Mutation
      mutation={REMOVE_FROM_CART_MUTATION}
      variables={{ id: props.id }}
      update={update}
      optimisticResponse={{
        __typename: 'Mutation',
        removeFromCart: {
          __typename: 'CartItem',
          id: props.id
        }
      }}
    >
      {(removeFromCart, { loading, error }) => {
        return (
          <BigButton
            title={'Delete Item'}
            disabled={loading}
            onClick={() => {
              removeFromCart().catch(err => alert(err.message));
            }}
          >
            &times;
          </BigButton>
        );
      }}
    </Mutation>
  );
};

export default RemoveFromCart;
