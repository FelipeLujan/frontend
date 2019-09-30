import React, { useState } from "react";
import Form from "./styles/Form";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

function RequestReset() {
  const [email, setEmail] = useState("");
  return (
    //CURRENT_USER_QUERY will be refetched once the mutation is finished
    <Mutation mutation={REQUEST_RESET_MUTATION} variables={{ email }}>
      {(reset, { error, loading, called }) => {
        return (
          <Form
            method="post"
            onSubmit={async event => {
              event.preventDefault();
              await reset();
              setEmail("");
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Request Password Reset</h2>
              <DisplayError error={error}> </DisplayError>
              {!error && !loading && called && (
                <p>Please check your email for a reset link.</p>
              )}
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
            </fieldset>
            <button type="submit"> Request Reset</button>
          </Form>
        );
      }}
    </Mutation>
  );
}

export default RequestReset;
