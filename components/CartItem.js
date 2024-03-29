import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import RemoveFromCart from "./RemoveFromCart";
import { adopt } from "react-adopt";
import { TOGGLE_CART_MUTATION } from "./Cart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  if (!cartItem.item)
    return (
      <CartItemStyles>
        <p>This item has been removed</p>
        <RemoveFromCart id={cartItem.id}> </RemoveFromCart>
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img width="100" alt={cartItem.item.title} src={cartItem.item.image} />
      <div className="cart-item-details">
        <h3>{cartItem.item.title}</h3>
        <p>
          {formatMoney(cartItem.item.price * cartItem.quantity)} -{" "}
          <em>
            {cartItem.quantity} &times; {formatMoney(cartItem.item.price)}
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id}> </RemoveFromCart>
    </CartItemStyles>
  );
};

CartItem.propTypes = {};

export default CartItem;
