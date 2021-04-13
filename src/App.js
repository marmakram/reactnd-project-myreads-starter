import React from 'react'
import {  SearchBook } from './components/main';
import Loader from "react-loader-spinner";
import { update } from './BooksAPI';

import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './home';

class BooksApp extends React.Component {
  state = {
    isLoading: false
  }
  handleSearchShelf = (book, shelf) => {
    debugger;
    update(book, shelf).then(a => {
      debugger
    })
  };
  render() {
    return (
      <div>
        {
          this.state.isLoading === true && <center><Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100} />
          </center>
        }
        {
          this.state.isLoading === false && <div>
            <BrowserRouter>
              <Switch>
                <Route path="/search" render={() => <SearchBook onChangeSearch={this.handleSearchShelf} />} />
                <Route exact path="/" component={Home} />
              </Switch>
            </BrowserRouter>
          </div>

        }
      </div>
    );
  }
}

export default BooksApp
