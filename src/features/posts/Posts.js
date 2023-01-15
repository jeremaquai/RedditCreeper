import React, { useEffect, } from "react";
import './Posts.css';

import redditLogo from '../../images/reddit-4.svg'

import { 
    addActivePost,
    selectPosts,
    fetchSubRedditPostsAsync,
    selectIsLoading,
} from "./postsSlice";

import { selectActiveSub } from "../subReddits/subRedditsSlice";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Posts() {
    
    const dispatch = useDispatch();
    
    const ACTIVE_SUB = useSelector(selectActiveSub);
    const POSTS = useSelector(selectPosts);
    const isLoading = useSelector(selectIsLoading);


    useEffect(() => {
        dispatch(fetchSubRedditPostsAsync(ACTIVE_SUB));
    }, [dispatch]);

    const checkThumbnailAction = (item) => {
        if (item.thumbnail === 'self') {
            return redditLogo
        } else {
            return item.thumbnail;
        }
    }

    const loadingAction = () => {
        while (isLoading) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            );
        }

        while (!isLoading) {
            return (
                <div className="posts">
                    <h2>Posts</h2>
                    {POSTS.map(item => {
                        return (
                            <Link to={'/individualPost'} >
                                <div key={item.id} className={'postCard'}>
                                    <img src={checkThumbnailAction(item)} >
                                    </img>
                                    <div className="postCardInfo">
                                        <h3> {item.title} </h3>
                                        <p> {item.text} </p>
                                        <div className="postInfo">
                                            <h4>Created by: {item.author} </h4>
                                            <h4>Up Votes: {item.upVotes} </h4>
                                            <h4>Down Votes: {item.downVotes} </h4>
                                        </div>
                                    </div>

                                </div>
                            </Link>
                        );
                    })}
                </div>
            );
        }
    };

    return (
        loadingAction()
    );
};