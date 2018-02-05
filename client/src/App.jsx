import React, { Component } from 'react';
import axios from 'axios';
import CoinList from './components/CoinList.jsx';
import FavoriteList from './components/FavoriteList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coinList: [],
      cloneCoinList:[],
      favoriteList: {},
    }
  };

  componentWillMount() {
    axios.get('/coins')
    .then((response) => {
      this.setState({
        coinList: response.data,
        cloneCoinList: response.data,
      });
    })
    .catch(err => console.log(err));
  }

  addFavorite = (coin) => {
    const favorites = Object.assign({}, this.state.favoriteList);
    favorites[coin.id] = coin;
    this.setState({
      favoriteList: favorites,
    });
  }

  removeFavorite = (id) => {
    const favorites = Object.assign({}, this.state.favoriteList);
    delete favorites[id];
    this.setState({
      favoriteList: favorites,
    });
  }

  sortRank = () => {
    let list = this.state.cloneCoinList;
    let temp = this.state.cloneCoinList;
    for (let i = 0, k= list.length - 1; i < list.length/2; i++, k-- ) {
      let temp = list[i];
      list[i] = list[k];
      list[k] = temp;
    };
    this.setState({
      coinList: list,
      cloneCoinList: temp
    });
  }

  sortName = () => {
    let list = this.state.coinList.sort((a,b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    this.setState({
      coinList: list
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cryptocurrency Market Notifications</h1>
        </header>
        <p className="App-intro">
          {this.state.response}
        </p>
        <FavoriteList favoriteList={this.state.favoriteList} removeFavorite={this.removeFavorite} />
        <CoinList sortRank={this.sortRank} sortName={this.sortName} coinList={this.state.coinList} addFavorite={this.addFavorite} />
      </div>
    );
  }
}

export default App;