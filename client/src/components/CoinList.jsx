import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Coin from './Coin.jsx';

const CoinList = props => (
  <div className="coinList">
    <ul>
      <li className="favorite-button"></li>
      <li><button onClick={props.sortRank}>Rank</button></li>
      <li><button onClick={props.sortName}>Name</button></li>
      <li><button onClick={props.sortNumber}>Price</button></li>
      <li><button>BTC Price</button></li>
      <li><button>Change (24H)</button></li>
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