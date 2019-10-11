import Link from 'next/link';
import CreateItem from '../components/CreateItem';
import Reset from '../components/Reset';

const ResetWrapper = props => {
  return <Reset resetToken={props.query.resetToken} />;
};

export default ResetWrapper;
