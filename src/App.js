import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Category from './Category/Category';
import Item from './Item/Item';
import mock from './mock/mock';

if (window.location.host === 'localhost:3000') {
  mock.initMock()
}

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Category} />
          <Route exact path="/items" component={Item} />
        </BrowserRouter>
      </div>
    );
  }
} 