import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Coin from './Coin.jsx';

const FavoriteList = (props) => {
  const { favoriteList, removeFavorite } = props;
  return (
    <div className="favoriteList">
      {Object.keys(favoriteList).map(id => (
        <Coin
          coin={favoriteList[id]}
          removeFavorite={removeFavorite}
          favorite={true}
          key={id}
        />
      ))}
    </div>
  );
};

FavoriteList.propTypes = {
  favoriteList: PropTypes.object.isRequired,
  removeFavorite: PropTypes.func.isRequired,
};

export default FavoriteList;