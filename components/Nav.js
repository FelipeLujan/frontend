import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import { TOGGLE_CART_MUTATION } from './Cart';
import { Mutation } from 'react-apollo';
import CartCount from './CartCount';

const Nav = () => (
  <User>
    {({ data }) => {
      return (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {data && data.me && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
              <Signout>5 </Signout>
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => {
                  return (
                    <button onClick={toggleCart}>
                      My Cart
                      <CartCount
                        count={data.me.cart.reduce((tally, cartItem) => {
                          return tally + cartItem.quantity;
                        }, 0)}
                      >
                        {' '}
                      </CartCount>
                    </button>
                  );
                }}
              </Mutation>
            </>
          )}
          {!data ||
            (!data.me && (
              <>
                <Link href="/signup">
                  <a>Sign in</a>
                </Link>{' '}
              </>
            ))}
        </NavStyles>
      );
    }}
  </User>
);
export default Nav;
