import React from "react";
import PropTypes from "prop-types";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";

import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import User from "./User";
import CartItem from "./CartItem";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import { adopt } from "react-adopt";
import TakeMyMoney from "./TakeMyMoney";

export const LOCAL_STATE_QUERY = gql`
  query {
    #    @client means go grab  cartOpen from local store instead of doing so from the db
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: <User />,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

const Cart = props => {
  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        if (!user || !user.data || !user.data.me) {
          return null;
        }
        console.log("meeeeeeeeeeee", user.data.me);
        let me = user.data.me;

        return (
          <CartStyles open={localState.data.cartOpen}>
            <header>
              <CloseButton title="close" onClick={toggleCart}>
                &times;
              </CloseButton>
              <Supreme>{me.name}'s cart</Supreme>
              <p>You have {me.cart.length} items in your cart</p>
            </header>
            <ul>
              {me.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem}>
                  {cartItem.id}
                </CartItem>
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>
              {me.cart.length && (
                <TakeMyMoney>
                  <SickButton>Checkout</SickButton>
                </TakeMyMoney>
              )}
            </footer>
          </CartStyles>
        );
      }}
    </Composed>
  );
};

Cart.propTypes = {};

export default Cart;
