import * as React from 'react';
// import { connect } from 'react-redux';
import Category from './Category/Category'; 
import Categories from './mock/categories';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Category Categories={[]} />
      </div>
    );
  }
}