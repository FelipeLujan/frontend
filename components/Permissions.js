import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import DisplayError from "./ErrorMessage";
import gql from "graphql-tag";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];

const User = ({ user }) => {
  const userPermissionsCheckboxes = possiblePermissions.map(permission => {
    return (
      <td>
        <label htmlFor={`${user.id}-permission-${permission}`}>
          <input type={"checkbox"} />
        </label>
      </td>
    );
  });
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      {userPermissionsCheckboxes}
      <td>
        <SickButton>Save </SickButton>
      </td>
    </tr>
  );
};

const Permissions = props => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        const users = data.users.map(user => <User user={user}> </User>);

        const tableHeaders = possiblePermissions.map(header => (
          <th>{header}</th>
        ));
        console.log("ALL USERS Query data", data);
        return (
          <div>
            <DisplayError error={error}> </DisplayError>
            <div>
              <h2>Manage Permissions</h2>
              <Table>
                <thead>
                  <tr>
                    <th>Name </th>
                    <th>Email </th>
                    {tableHeaders}
                  </tr>
                </thead>
                <tbody>{users}</tbody>
              </Table>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Permissions;
