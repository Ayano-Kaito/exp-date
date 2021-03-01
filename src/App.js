import * as React from 'react';
// import { connect } from 'react-redux';
import Category from './Category/Category'; 
import AxosMock from './mock/AxiosMock';

if (window.location.host === 'localhost:3000') {
  AxosMock.initMock()
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