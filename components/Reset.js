import React, { useState } from "react";
import Form from "./styles/Form";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "./User";

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

function Reset(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    //CURRENT_USER_QUERY will be refetched once the mutation is finished
    <Mutation
      mutation={RESET_MUTATION}
      variables={{ password, confirmPassword, resetToken: props.resetToken }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(reset, { error, loading, called }) => {
        return (
          <Form
            method="post"
            onSubmit={async event => {
              event.preventDefault();
              await reset();
              setPassword("");
              setConfirmPassword("");
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Your password</h2>
              <DisplayError error={error}> </DisplayError>

              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                />
              </label>
              <label htmlFor="confirmPassword">
                Confirm Password
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                />
              </label>
            </fieldset>
            <button type="submit">Change password</button>
          </Form>
        );
      }}
    </Mutation>
  );
}

export default Reset;
