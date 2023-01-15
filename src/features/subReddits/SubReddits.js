import React, { useEffect, } from "react";
import './SubReddits.css';
import { 
    fetchSubRedditsAsync,
    selectSubReddits,
    selectIsLoading,  
} from "./subRedditsSlice";

import { fetchSubRedditPostsAsync } from "../posts/postsSlice";

import { 
    useDispatch,
    useSelector 
} from "react-redux";

import { addActiveSub } from "./subRedditsSlice";
import { Link } from "react-router-dom";

export default function SubReddits() {

    const dispatch = useDispatch();

    const subReddits = useSelector(selectSubReddits);
    console.log(subReddits[0]);

    const isLoading = useSelector(selectIsLoading);
    

    useEffect(() => {
        dispatch(fetchSubRedditsAsync());
    }, [dispatch]);

    const getRandomSubReddits = () => {
        const randomSubRedditsList = [];

        for (let i = 1; i <= 10; i++) {
            const int = Math.floor(Math.random() * subReddits.length);
            const randomSubReddit = subReddits[int];
            randomSubRedditsList.push(randomSubReddit);
        }
        console.log(randomSubRedditsList);
        return randomSubRedditsList;
    }


    const randomSubReddits = getRandomSubReddits(subReddits);
    console.log(randomSubReddits);

    const loadingAction = () => {
        while (isLoading) {
            return (
                <div className="loading">
                    <h2>Loading...</h2>
                </div>
            );
        } 
        
        while (!isLoading) {
            return (
                <div className="innerSub">
                    {subReddits.map(item => {
                        if (!item) {
                            return ;
                        } else {
                            return (
                                <div>
                                {/* <button 
                                    className="subreddit" 
    
                                    key={item.name ? item.name : 'Name'}
                                    url={item.url}
                                    onClick={
                                        function(e) {
                                            dispatch(addActiveSub(item.url));
                                    }}
                                    >
                                         {item.displayName || 'Name'}
                                </button> */}
                                <Link to='/posts'>
                                    <div className="subreddit"
                                        key={item.name}
                                        onClick={
                                            async function(e) {
                                                dispatch(addActiveSub(item.url)).then(dispatch(fetchSubRedditPostsAsync()));
                                                
                                        }
                                        }>
                                            <h2>{item.url}</h2>
                                            <img src={item.headerImg} />
                                            
                                    </div>
                                </Link>
                                </div>
                            );
                        }
                    })}
                </div>
            );
        }
    }

    return (
        <div className="outerSub">
            <h3>Ten Random SubReddits to Browse</h3>
            <p>Refresh to change buttons</p>
            {loadingAction()}
        </div>
    );
}