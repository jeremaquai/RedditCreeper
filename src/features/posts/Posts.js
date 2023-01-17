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
    
    
    const POSTS = useSelector(selectPosts);
    const isLoading = useSelector(selectIsLoading);

    
    const ACTIVE_SUB = useSelector(selectActiveSub);
        
    

    useEffect(() => {
        const useThis = ACTIVE_SUB
        dispatch(fetchSubRedditPostsAsync(useThis));
    }, [dispatch, ACTIVE_SUB]);

    const checkThumbnailAction = (item) => {
        if (item.thumbnail === 'self' || item.thumbnail === '') {
            return redditLogo
        } else {
            return item.thumbnail;
        }
    }

    const loadingAction = () => {
        while (isLoading) {
            return (
                <div className="loading" >
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
                            <Link key={item.id} to={'/individualPost'} >
                                <div  className={'postCard'}
                                    onClick={
                                        async function(e) {
                                            dispatch(addActivePost(item.permalink));
                                        }
                                        }>
                                    <img src={checkThumbnailAction(item)} alt='thumbnail' >
                                    </img>
                                    <div className="postCardInfo">
                                        <h3> {item.title} </h3>
                                        {/* <p> {item.text} </p> */}
                                        <div className="postInfo">
                                            <div className="createdBy" >
                                                <h4>Created by: </h4>
                                                <h4 className="postInfoText">{item.author}</h4>
                                            </div>
                                            <div className="upVotes" >
                                                <h4>Up Votes:  </h4>
                                                <h4 className="postInfoText" >{item.upVotes}</h4>
                                            </div>
                                            <div className="downVotes" >
                                            <h4>Down Votes: </h4>
                                                <h4 className="postInfoText" >{item.downVotes}</h4>
                                            </div>
                                            
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