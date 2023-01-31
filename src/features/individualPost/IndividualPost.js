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

    const checkIsVideo = (itemToCheck) => {
        if (itemToCheck.isVideo) {
            console.log(itemToCheck.secureMedia.reddit_video.fallback_url);
            return (
                <video  src={itemToCheck.secureMedia.reddit_video.fallback_url} type='video/mp4' controls autoPlay>
                </video>
            );
        } else if (itemToCheck.url && itemToCheck.url.includes('clips.twitch.tv') && itemToCheck.secureMedia !== null) {
            return (
                <video src={itemToCheck.secureMedia.oembed.thumbnail_url} type='video/mp4' controls autoPlay >

                </video>
            );
        } else {
            return <img src={itemToCheck.url} alt='' />
        }
    }

    useEffect(() => {

        const useThis = ACTIVE_POST;

        dispatch(fetchIndividualPostAsync(useThis));
        dispatch(fetcchIndividualPostCommentsAsync(useThis));
    }, [dispatch, ACTIVE_POST]);

    return (
        <div key={POST[0].id} className="indPostCard" >
            <h2> {POST[0].title } </h2>
            <div className="authorBanner" >
                <div className="author" >
                    <h3>Created by:</h3>
                    <h3 className="info" > u/{POST[0].author} </h3>
                </div>
                <div className="upVotes" >
                    <h3><i class="fa-solid fa-up-long"></i> </h3>
                    <h3 className="info" > {POST[0].ups}</h3>
                </div>
                <div className="downVotes" >
                    <h3><i class="fa-solid fa-arrow-down-long"></i> </h3>
                    <h3 className="info" >{POST[0].downs} </h3>
                </div>
                
                
                
            </div>
            { checkIsVideo(POST[0]) }
            {/* <img src={ POST[0].url } alt={''} /> */}
            <p> {POST[0].text} </p>
            <Comments />
        </div>
    );
}