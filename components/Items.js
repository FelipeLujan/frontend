import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first:Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: title_ASC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;
const Center = styled.div`
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
        <Center>
          <Pagination page={parseFloat(this.props.page) || 1}> </Pagination>
          <Query
            query={ALL_ITEMS_QUERY}
            variables={{
              skip: this.props.page * perPage - perPage,
              first: perPage
            }}
          >
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
          <Pagination page={parseFloat(this.props.page) || 1}> </Pagination>
        </Center>
      </div>
    );
  }
}
export { ALL_ITEMS_QUERY };
export default Items;
