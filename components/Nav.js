import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";

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
            </>
          )}
          {!data ||
            (!data.me && (
              <>
                <Link href="/signup">
                  <a>Sign in</a>
                </Link>{" "}
              </>
            ))}
        </NavStyles>
      );
    }}
  </User>
);
export default Nav;
