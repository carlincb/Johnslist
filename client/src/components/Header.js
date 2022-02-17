import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import $ from 'jquery';

function Header(props) {
    var importedCategories = [{href: 'fake-category', text: 'Fake Category'}];

    //TODO: Add a loop that appends category data to the imported categories array when the site is more complete. 

    //Toggles between light and dark themes
    const [ siteTheme, setSiteTheme ] = useState('./css/light.css');

    function dropdownMenu () {
        $(this).siblings('.dropdown-menu').slideToggle();
    }

    //array the stores objects that are used to render the dropdown menus
    const dropdownMenus = [
        {
            title: "Sell",
            linkInfo: [{href: "selling-info", text: "Information"}, {href: "marketplace", text: "Marketplace"}],
            ariaLabel: "Open seller dropdown"
        },
        {
            title: "Buy",
            linkInfo: [{href: "buying-info", text: "Information"}, {href: "marketplace", text: "Marketplace"}],
            ariaLabel: "Open buyer dropdown"
        },
        {
            title: "Categories",
            linkInfo: [...importedCategories],
            ariaLabel: "Open category dropdown"
        }
    ]

    return (
        <header>
            <link rel="stylesheet" href={siteTheme}/>
            <a href="/" id="home-link"><img src="./images/kintsugi_logo.png" alt="Go to Kintsugi home page"/></a>
            <nav id="sale-nav" className="navbar">
                {/* Creates a dropdown menu with it's links for all the objects in the dropdown array */}
                {dropdownMenus.map(menu => (
                    <span className="dropdown-block">
                        <button className="invis link-dropdown" aria-label={menu.ariaLabel} onClick={dropdownMenu}>{menu.title}<i></i></button>
                        <div className="link-section flex column dropdown-menu">
                        {menu.linkInfo.map(newLink => (
                            <a href={newLink.href} className="dropdown-item" key={newLink.href}>{newLink.text}</a>
                        ))}
                        </div>
                    </span>
                ))}
            </nav>
            <nav id="login-info-nav">
                <a href="about">About Us</a>
                <a href="login" id="login-link">Login</a>
            </nav>
            {/* Checkbox for toggling between light and dark themes */}
            <input type="checkbox" aria-label="Theme toggle button" id="them-toggle" 
            onChange={() => siteTheme === './css/light.css' ? 
            setSiteTheme('./css/dark.css') : setSiteTheme('./css/light.css')}/>
        </header>
    )
}

export default Header;