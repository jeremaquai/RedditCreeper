import React from 'react';
import './App.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Main from '../components/main/Main';
import { useEffect, } from 'react';
import { useSelector, useDispatch
} from 'react-redux';
import { selectActiveSub } from '../features/subReddits/subRedditsSlice';
import { fetchSubRedditPostsAsync } from '../features/posts/postsSlice';

function App() {

  const dispatch = useDispatch();
  const ACTIVE_SUB = useSelector(selectActiveSub);
  useEffect(() => {
    dispatch(fetchSubRedditPostsAsync(ACTIVE_SUB));
}, [dispatch]);

  return (
    <div className='App'>
      <Header />
        <Main />
      <Footer />
    </div>
  );
}

export default App;
