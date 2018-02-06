import React from 'react';
import PropTypes from 'prop-types';

const Coin = props => {
  const { name, price_usd, price_btc, rank, percent_change_24h} = props.coin;

  const handleClick = (coin) => {
    if (!props.favorite){
      props.addFavorite(coin);
    } else {
      props.removeFavorite(coin.id);
    }
  }

  const renderButton = () => {
    if (!props.favorite) {
      return <button className="coinButton" onClick={() => handleClick(props.coin)}>+</button>;
    } else {
      return <button className="coinButton" onClick={() => handleClick(props.coin)}>-</button>;
    }
  }

  const renderPercentage = () => {
    if (percent_change_24h.includes('-')) {
      return <li className="negative">{percent_change_24h}%</li>;
    } else {
      return <li className="positive">{percent_change_24h}%</li>;
    }
  }

  return (
    <div>
      <ul className="coin">
        <li className="favorite-button">{renderButton()}</li>
        <li>{rank}</li>
        <li>{name}</li>
        <li>{price_usd}</li>
        <li>{price_btc}</li>
        {renderPercentage()}
      </ul>
    </div>
  );
};

Coin.propTypes = {

};

export default Coin;