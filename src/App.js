import React from 'react';
import './App.css';
import Header from './Components/Layout/Header.js'
import Main from './Components/Main.js';
import Footer from './Components/Layout/Footer.js'

import SearchProvider from './store/SearchProvider';


const App = () => {
  return (
    <>
      <SearchProvider className="main-container">
        <Header />
        <Main />
        <Footer />
      </SearchProvider>

    </>
  );
}

export default App;
