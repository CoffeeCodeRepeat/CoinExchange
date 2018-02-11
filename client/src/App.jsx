import React, { Component } from 'react';
import axios from 'axios';
import CoinList from './components/CoinList.jsx';
import FavoriteList from './components/FavoriteList.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      coinList: [],
      favoriteList: {},
      nameSorted: false,
      numberSorted: false
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
    let list = this.state.coinList;
    if (this.state.coinList[0].rank === '1' ) {
      list.sort((a,b) => {
        return b.rank - a.rank;
      })
    } else {
      list.sort((a, b) => {
        return a.rank - b.rank;
      })
    }
    this.setState({
      coinList: list,
      nameSorted: false,
      numberSorted: false,
    })
  }

  sortName = () => {
    console.log('state', this.state.nameSorted);
    const list = this.state.coinList.sort((a,b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (!this.state.nameSorted) {
        // console.log('first');
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      } else {
        // console.log('second');
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      }
    });
    this.setState({
      coinList: list,
      nameSorted: !this.state.nameSorted,
      numberSorted: false
    });
  }

  sortNumber =(column) => {
    let list = this.state.coinList
    if (!this.state.numberSorted) {
      list.sort((a, b) => {
        return b[column] - a[column];
      })
    } else {
      list.sort((a, b) => {
        return a[column] - b[column];
      })
    }
    this.setState({
      coinList: list,
      nameSorted: false,
      numberSorted: !this.state.numberSorted
    })
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
        <CoinList sortRank={this.sortRank} sortName={this.sortName} sortNumber={this.sortNumber} coinList={this.state.coinList} addFavorite={this.addFavorite} />
      </div>
    );
  }
}

export default App;