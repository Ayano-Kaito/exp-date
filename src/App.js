import React from 'react';
import Category from './Category/Category';
import categoryMock from './mock/categories';

if (window.location.host === 'localhost:3000') {
  categoryMock.initMock()
}

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Category />
      </div>
    );
  }
} 