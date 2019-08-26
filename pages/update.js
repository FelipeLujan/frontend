import Link from "next/link";
import UpdateItem from "../components/UpdateItem";

const Sell = props => {
  const { query } = props;
  return <UpdateItem id={query.id} />;
};

export default Sell;
