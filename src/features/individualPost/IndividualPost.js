import React, { useEffect } from "react";
import './IndividualPost.css';

import { selectActivePosts } from "../posts/postsSlice";

import { fetcchIndividualPostCommentsAsync, selectPost } from "./individualPostSlice";

import { fetchIndividualPostAsync } from "./individualPostSlice";

import { useDispatch, useSelector } from "react-redux";
import Comments from "../comments/Comments";

export default function IndividualPost() {

    const dispatch = useDispatch();
    const POST = useSelector(selectPost);

    const ACTIVE_POST = useSelector(selectActivePosts);

    useEffect(() => {
        dispatch(fetchIndividualPostAsync(ACTIVE_POST));
        dispatch(fetcchIndividualPostCommentsAsync(ACTIVE_POST));
    }, [dispatch]);

    return (
        <div key={POST[0].id} className="indPostCard" >
            <h2> {POST[0].title } </h2>
            <div className="authorBanner" >
                <div className="author" >
                    <h3>Created by:</h3>
                    <h3 className="info" > u/{POST[0].author} </h3>
                </div>
                <div className="upVotes" >
                    <h3>Up Votes: </h3>
                    <h3 className="info" > {POST[0].ups}</h3>
                </div>
                <div className="downVotes" >
                    <h3>Down Votes: </h3>
                    <h3 className="info" >{POST[0].downs} </h3>
                </div>
                
                
                
            </div>
            
            <img src={ POST[0].imgSrc ? POST[0].imgSrc : '#'} />
            <p> {POST[0].text} </p>
            <Comments />
        </div>
    );
}