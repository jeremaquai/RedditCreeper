import React, { useEffect } from "react";
import './Posts.css';

import { addActivePost, selectIsLoading } from "./postsSlice";
import { selectActiveSub } from "../subReddits/subRedditsSlice";

import { useDispatch, useSelector } from "react-redux";

export default function Posts() {
    
    const dispatch = useDispatch();
    const ACTIVE_SUB = useSelector(selectActiveSub);

    const isLoading = useSelector(selectIsLoading);

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
                </div>
            );
        }
    };

    return (
        loadingAction()
    );
};