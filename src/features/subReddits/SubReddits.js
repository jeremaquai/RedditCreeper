import React, { useEffect, } from "react";
import './SubReddits.css';
import { fetchSubRedditsAsync, selectSubReddits } from "./subRedditsSlice";
import { useDispatch, useSelector } from "react-redux";
import { addActiveSub } from "./subRedditsSlice";

export default function SubReddits() {

    const dispatch = useDispatch();

    const subReddits = useSelector(selectSubReddits);

    useEffect(() => {
        dispatch(fetchSubRedditsAsync());
    }, [dispatch]);

    return (
        <div className="outerSub">
            {subReddits.map(item => {
                return (
                    <button 
                        className="subreddit" 
                        key={item.name}
                        url={item.url}
                        onClick={
                            function(e) {
                                dispatch(addActiveSub(item.url));
                        }}
                        >
                            {item.displayName}
                    </button>
                );
            })}
        </div>
    );
}