import React, { useState, useEffect } from 'react';
import axios from "axios";
import Category from './Category/Category';
import mock from './mock/categories';

const App = () => {
  const [categories, setCategories] = useState();

  useEffect(() => {
    axios.get("/api/categories")
      .then((res) => setCategories(res.data))
  },[categories]);

  return(
    <div className="App">
      <Category categories={categories}/>
    </div>
  );
};

export default App