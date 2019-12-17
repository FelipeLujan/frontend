import React from "react";
import PropTypes from "prop-types";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { perPage } from "../config";
import Head from "next/head";
import Link from "next/link";
import DisplayError from "./ErrorMessage";
const PAGINATION_QUERY = gql`
  query PAGINATIOON_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) {
        return <p>Loading... </p>;
      }
      if (error) {
        return <DisplayError error={error}> </DisplayError>;
      }
      console.log("pagination data", data);
      const { count } = data.itemsConnection.aggregate;
      const totalPages = Math.ceil(count / perPage);
      return (
        <PaginationStyles>
          <Head>
            <title>
              SlickFits | page {props.page} of {totalPages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: props.page - 1 }
            }}
          >
            <a className="prev" aria-disabled={props.page <= 1}>
              Prev
            </a>
          </Link>
          <p>
            page {props.page} of {totalPages}
          </p>
          <p> {count} items total</p>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: props.page + 1 }
            }}
          >
            <a className="prev" aria-disabled={props.page >= totalPages}>
              Next
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

Pagination.propTypes = {};

export default Pagination;
