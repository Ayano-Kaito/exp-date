import * as React from 'react';
// import { connect } from 'react-redux';
import Category from './Category/Category'; 
import initMock from './mock/categories';

if (window.location.host === 'localhost:3000') {
  initMock()
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Category categories={[]} />
      </div>
    );
  }
}