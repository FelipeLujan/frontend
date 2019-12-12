import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import StripeCheckout from "react-stripe-checkout";
import User, { CURRENT_USER_QUERY } from "./User";
import calcTotalPrice from "../lib/calcTotalPrice";
import NProgress from "nprogress";

const totalItems = cart => {
  return cart.reduce((tally, cartitem) => tally + cartitem.quantity, 0);
};

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

const onTokenResponse = async (response, createOrderMutation) => {
  NProgress.start();
  const order = await createOrderMutation({
    variables: { token: response.id }
  });
  console.log(order);
  Router.push({
    pathname: "/order",
    query: { id: order.data.createOrder.id }
  });
};

const TakeMyMoney = props => {
  return (
    <div>
      <User>
        {({ data: { me } }) => {
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrderMutation => {
                return (
                  <StripeCheckout
                    amount={calcTotalPrice(me.cart)}
                    name={"sick fits"}
                    description={`Order of ${totalItems(me.cart)}`}
                    image={me.cart.length && me.cart[0].item.image}
                    stripeKey="pk_test_VUTkZZkYlYJyJ02l55qEr9XR009DpaZE1I"
                    currency={"USD"}
                    email={me.email}
                    token={res => onTokenResponse(res, createOrderMutation)}
                  >
                    {props.children}
                  </StripeCheckout>
                );
              }}
            </Mutation>
          );
        }}
      </User>
    </div>
  );
};

TakeMyMoney.propTypes = {};

export default TakeMyMoney;
