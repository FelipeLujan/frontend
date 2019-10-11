import Items from '../components/Items';

const Home = props => {
  return (
    <div>
      <Items page={props.query.page}> </Items>
    </div>
  );
};

export default Home;
