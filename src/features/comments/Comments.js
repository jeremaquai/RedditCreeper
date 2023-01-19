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
                            <h4>Ups: {comment.ups} </h4>
                            <h4>Downs: {comment.downs} </h4>
                        </div>
                        <div className="body">
                            <p> {comment.body} </p>
                        </div>
                    </div>
                    
                
            );
        })
    );
}