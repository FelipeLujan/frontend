import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import DisplayError from "./ErrorMessage";
import OrderStyles from "./styles/OrderStyles";
import { format } from "date-fns";
import Head from "next/head";
import formatMoney from "../lib/formatMoney";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

const Order = props => {
  return (
    <Query query={SINGLE_ORDER_QUERY} variables={{ id: props.id }}>
      {({ data, error, loading }) => {
        if (error) {
          return <DisplayError error={error}> </DisplayError>;
        }
        if (loading) {
          return <span>loading...</span>;
        }
        const order = data.order;
        return (
          <OrderStyles>
            <Head>
              <title>Sick Fits - Order {order.id}</title>
            </Head>
            <p>
              <span>Order ID:</span>
              <span>{props.id}</span>
            </p>
            <p>
              <span>Date</span>
              <span>{order.createdAt}</span>
            </p>
            <p>
              <span>Order Total</span>
              <span>{formatMoney(order.total)}</span>
            </p>
            <p>
              <span>Items Total</span>
              <span>{order.items.length}</span>
            </p>
            <div className="items">
              {order.items.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={order.title} />
                  <div className="item-details">
                    <h2>{item.title}</h2>
                    <p>Qty: {item.quantity}</p>
                    <p>Each: {formatMoney(item.price)}</p>
                    <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </OrderStyles>
        );
      }}
    </Query>
  );
};

Order.propTypes = {};

export default Order;
