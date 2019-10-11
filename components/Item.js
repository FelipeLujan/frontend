import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import ItemStyles from './styles/ItemStyles';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './deleteItem';
import AddToCart from './AddToCart';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item } = this.props;
    return (
      <ItemStyles>
        {item.image && <img src={item.image} alt={item.title} />}
        <Title>
          <Link href={{ pathname: '/item', query: { id: item.id } }}>
            <a>{item.title}</a>
          </Link>
        </Title>
        <PriceTag>{formatMoney(item.price)}</PriceTag>
        <p>{item.description}</p>
        <div className="buttonList">
          <Link
            href={{
              pathname: 'update',
              query: { id: item.id }
            }}
          >
            <a>Edit</a>
          </Link>
          <AddToCart id={item.id}> </AddToCart>
          <DeleteItem id={item.id}>Delete Item</DeleteItem>
        </div>
      </ItemStyles>
    );
  }
}

export default Item;
