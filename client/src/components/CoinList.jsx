import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Coin from './Coin.jsx';

const CoinList = props => (
  <div className="coinList">
    <ul>
      <li className="favorite-button"></li>
      <li>Rank</li>
      <li>Name</li>
      <li>Price</li>
      <li>BTC Price</li>
      <li>Change (24H)</li>
    </ul>
    {props.coinList.map(coin => (
      <Coin
        coin={coin}
        addFavorite={props.addFavorite}
        favorite={false}
        key={coin.id}
      />
    ))}
  </div>
);

CoinList.propTypes = {
  coinList: PropTypes.arrayOf(PropTypes.object).isRequired,
  addFavorite: PropTypes.func.isRequired,
};

export default CoinList;