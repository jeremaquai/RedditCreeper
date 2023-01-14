import React, { useEffect, } from "react";
import './SubReddits.css';
import { 
    fetchSubRedditsAsync,
    selectSubReddits,
    selectIsLoading,  
} from "./subRedditsSlice";

import { 
    useDispatch,
    useSelector 
} from "react-redux";

import { addActiveSub } from "./subRedditsSlice";

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
                <h2>Loading...</h2>
            );
        } 
        
        while (!isLoading) {
            return (
                <div className="outerSub">
                    {randomSubReddits.map(item => {
                        if (!item) {
                            return ;
                        } else {
                            return (
                                <button 
                                    className="subreddit" 
    
                                    key={item.name ? item.name : 'Name'}
                                    url={item.url}
                                    onClick={
                                        function(e) {
                                            dispatch(addActiveSub(item.url));
                                    }}
                                    >
                                         {item.displayName || 'Name'}
                                </button>
                            );
                        }
                    })}
                </div>
            );
        }
    }

    return (
        <div>
            <h3>Ten Random SubReddits to Browse</h3>
            <p>Refresh to change buttons</p>
            {loadingAction()}
        </div>
    );
}