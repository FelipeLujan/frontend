import React, { useState } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import { Router } from "next/router";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { ApolloConsumer } from "react-apollo";
import { SearchStyles, DropDown, DropDownItem } from "./styles/DropDown";
import styled from "styled-components";

const Img = styled.img``;

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;
const onInput = async (event, client) => {
  console.log(client);
  const res = await client.query({
    query: SEARCH_ITEMS_QUERY,
    variables: { searchTerm: event.target.value }
  });
  console.log(res);
};
export const AutoComplete = props => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const onInput = async (event, client) => {
    setLoading(true);
    console.log(client);
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: event.target.value }
    });
    if (res) {
      setLoading(false);
      setItems(res.data.items);
    }
    console.log(res);
  };
  const routeToItem = item => {
    Router.push({
      pathname: "/item",
      query: { id: item.id }
    });
  };
  return (
    <SearchStyles>
      <Downshift
        itemToString={item => (item === null ? `` : item.title)}
        onChange={routeToItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          InputValue,
          highlightedIndex
        }) => {
          return (
            <div>
              <ApolloConsumer>
                {client => {
                  return (
                    <input
                      type="search"
                      {...getInputProps({
                        onChange: event => {
                          event.persist();
                          onInput(event, client);
                        },
                        placeholder: "search for an item",
                        type: "Search",
                        className: loading ? "loading" : "",
                        id: "search"
                      })}
                    />
                  );
                }}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {items.map((item, index) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width={50} alt={item.img} src={item.img} />{" "}
                      {item.title}
                    </DropDownItem>
                  ))}
                </DropDown>
              )}
            </div>
          );
        }}
      </Downshift>
    </SearchStyles>
  );
};

const Search = props => {
  return <div></div>;
};

Search.propTypes = {};

export default Search;
