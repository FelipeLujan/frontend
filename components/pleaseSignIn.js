import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import Signin from './SignIn';

const PleaseSignIn = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        console.log(data);
        if (loading) return <p>Loading...</p>;
        if (!data.me) {
          return (
            <div>
              <p>Please sign in before continuing</p>
              <Signin> </Signin>
            </div>
          );
        }
        return props.children;
      }}
    </Query>
  );
};

PleaseSignIn.propTypes = {};

export default PleaseSignIn;
