import React from 'react';
import './App.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SubReddits from '../features/subReddits/SubReddits';
import Posts from '../features/posts/Posts';

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='homePage'>
        <SubReddits />
        <Posts />
      </div>
      <Footer />
    </div>
  );
}

export default App;
