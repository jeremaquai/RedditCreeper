import React from "react";
import './Comments.css';

import { useSelector } from "react-redux";

import { selectComments,  } from "../individualPost/individualPostSlice";


export default function Comments() {

    const COMMENTS = useSelector(selectComments);

    return (
        COMMENTS.map(comment => {
            return (
                
                    <div key={comment.id} className="commentCard">
                        <div className="info">
                            <h4> u/{comment.author} </h4>
                            <p><i class="fa-solid fa-up-long"></i> {comment.ups} </p>
                            <p><i class="fa-solid fa-arrow-down-long"></i> {comment.downs} </p>
                        </div>
                        <div className="body">
                            <p> {comment.body} </p>
                        </div>
                    </div>
                    
                
            );
        })
    );
}