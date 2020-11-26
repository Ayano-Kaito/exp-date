import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from './Category/Category'; 
import categories from './mock/categories';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Category />    
      </div>
    );
  }
}

export default connect() (App);