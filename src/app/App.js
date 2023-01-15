import React from 'react';
import './App.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SubReddits from '../features/subReddits/SubReddits';
import Posts from '../features/posts/Posts';
import Main from '../components/main/Main';

function App() {
  return (
    <div className='App'>
      <Header />
        <Main />
      <Footer />
    </div>
  );
}

export default App;
