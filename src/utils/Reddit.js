import React from "react";


export default function Reddit() {
    const getSubReddits = async () => {
        const response = await fetch('https://www.reddit.com/search.json/?q=r%2Fhome&type=sr')
    }
    const getSubRedditPosts = (sub) => async () => {
        const response = await fetch(`www.https://www.reddit.com${sub}.json?limit=100&`)
    } 
}