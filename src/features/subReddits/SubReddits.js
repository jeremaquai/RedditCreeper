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

    const loadingAction = () => {
        while (isLoading) {
            return (
                <div className="loading">
                    <h2>Loading... All SubReddits...</h2>
                    <h2>Please be Patient</h2>
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
                                <Link key={item.name} to='/posts'>
                                    <div key={item.name} className="subreddit"
                                        
                                        onClick={
                                            async function(e) {
                                                dispatch(addActiveSub(item.url));
                                                
                                        }
                                        }>
                                            <h2>{item.url}</h2>
                                            <img src={item.headerImg} />
                                            
                                    </div>
                                </Link>
                            );
                        }
                    })}
                </div>
            );
        }
    }

    return (
        <div className="outerSub">
            
            {loadingAction()}
        </div>
    );
}