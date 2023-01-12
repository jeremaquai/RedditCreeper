import React from "react";
import './Header.css';
import logo from '../../images/reddit-4.svg';
import SearchBar from "../../features/searchbar/SearchBar";

export default function Header() {
    return (
        <header>
            <div className="logo" >
                <img className="redditLogo" src={logo}  alt='Reddit Logo' />
                <h1>
                    <span id="logoOne" >Reddit</span>
                    <span id="logoTwo" >Creeper</span>
                </h1>
            </div>
            <div className="searchBar">
                <SearchBar />
            </div>
        </header>
    );
}