import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import DisplayError from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import Mutation from 'react-apollo/Mutation';
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

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const possiblePermissions = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
];

const User = ({ user }) => {
  const [permissions, setPermissions] = useState(user.permissions);
  const handlePermissionChange = event => {
    const checkbox = event.target;
    let updatedPermissions = [...permissions];
    if (updatedPermissions.includes(checkbox.value)) {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    } else {
      updatedPermissions = [...updatedPermissions, checkbox.value];
    }

    setPermissions(updatedPermissions);
    console.log(permissions);
  };
  const userPermissionsCheckboxes = possiblePermissions.map(permission => {
    return (
      <td key={`${user.id}-permission-${permission}`}>
        <label htmlFor={`${user.id}-permission-${permission}`}>
          <input
            id={`${user.id}-permission-${permission}`}
            type={'checkbox'}
            defaultChecked={permissions.includes(permission)}
            value={permission}
            onChange={handlePermissionChange}
          />
        </label>
      </td>
    );
  });
  return (
    <Mutation
      mutation={UPDATE_PERMISSIONS_MUTATION}
      variables={{ permissions, userId: user.id }}
    >
      {(updatePermissions, { loading, error }) => {
        return (
          <>
            {error && <DisplayError error={error} />}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {userPermissionsCheckboxes}
              <td>
                <SickButton
                  type="button"
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  Save
                </SickButton>
              </td>
            </tr>
          </>
        );
      }}
    </Mutation>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array
  }).isRequired
};

const Permissions = props => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        const users = data.users.map((user, index) => (
          <User user={user} key={user.id}>
            {' '}
          </User>
        ));

        const tableHeaders = possiblePermissions.map((header, index) => (
          <th key={index}>{header}</th>
        ));
        console.log('ALL USERS Query data', data);
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
