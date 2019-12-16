import React from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";
import { Query } from "react-apollo";
import User from "./User";
import styled from "styled-components";
import OrderItemStyles from "./styles/OrderItemStyles";
import Link from "next/link";
import { formatDistance } from "date-fns";
import formatMoney from "../lib/formatMoney";
const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        quantity
        description
        image
      }
    }
  }
`;

const OrderUL = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
`;
const OrderList = props => {
  return (
    <Query query={USER_ORDERS_QUERY}>
      {({ data: { orders }, loading, error }) => {
        if (loading) {
          return <p>Loading</p>;
        }
        if (error) {
          return <DisplayError error={error}> </DisplayError>;
        }

        return (
          <div>
            <h2>you have {orders.length} orders</h2>
            <OrderUL>
              {" "}
              {orders.map(order => {
                return (
                  <OrderItemStyles>
                    <Link
                      href={{ pathname: "/order", query: { id: order.id } }}
                    >
                      <a>
                        <div className="order-meta">
                          <p>
                            {order.items.reduce((a, b) => a + b.quantity, 0)}{" "}
                            items
                          </p>
                          {/*<p>{formatDistance(order.createdAt, new Date())}</p>*/}
                          c <p>{formatMoney(order.total)}</p>
                        </div>
                        <div className="images">
                          {order.items.map(item => (
                            <img key={item.id} src={item.image} />
                          ))}
                        </div>
                      </a>
                    </Link>
                  </OrderItemStyles>
                );
              })}
            </OrderUL>
          </div>
        );
      }}
    </Query>
  );
};

OrderList.propTypes = {};

export default OrderList;
