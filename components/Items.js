import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
const centered = styled.div`
  text-align: center;
`;
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (
      <div>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <div>im loading</div>;
            if (error) return <span>i found an error</span>;
            return (
              <ItemsList>
                {data.items.map((item, index) => (
                  <Item item={item} key={index}>
                    {item.title}
                  </Item>
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </div>
    );
  }
}
export { ALL_ITEMS_QUERY };
export default Items;
