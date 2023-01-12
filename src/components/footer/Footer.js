import React from "react";
import SubReddits from "../../features/subReddits/SubReddits";
import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <div className="subReddits">
                {/* <SubReddits /> */}
            </div>
            <div className="devInfo">
                <p>©Jeremaquai</p>

            </div>
        </footer>
    );
}