import React, { useState } from "react";
import Form from "./styles/Form";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import DisplayError from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  console.log(name);
  return (
    <Mutation mutation={SIGNUP_MUTATION} variables={{ email, password, name }}>
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
              <h2>signup for an account</h2>
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
              <label htmlFor="name">
                name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={name}
                  onChange={event => setName(event.target.value)}
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

Signup.propTypes = {};

export default Signup;
