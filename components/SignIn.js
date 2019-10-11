import React, { useState } from 'react';
import Form from './styles/Form';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

function Signin() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  return (
    //CURRENT_USER_QUERY will be refetched once the mutation is finished
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={{ email, password }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => {
        return (
          <Form
            method="post"
            onSubmit={async event => {
              event.preventDefault();
              const response = signup();
              console.log(response);
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign into your account</h2>
              <DisplayError error={error}> </DisplayError>
              <label htmlFor="email">
                email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </label>
              <label htmlFor="password">
                password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </label>
            </fieldset>
            <button type="submit"> Submit</button>
          </Form>
        );
      }}
    </Mutation>
  );
}

Signin.propTypes = {};

export default Signin;
