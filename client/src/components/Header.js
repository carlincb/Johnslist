import React, { useState } from 'react';

function Header(props) {
    var importedCategories = [{href: 'fake-category', text: 'Fake Category'}];

    //TODO: Add a loop that appends category data to the imported categories array when the site is more complete. 

    //Toggles between light and dark themes
    const [ siteTheme, setSiteTheme ] = useState('./css/light.css');
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
                    <span class="dropdown-block">
                        <button className="link-dropdown" ariaLabel={menu.ariaLabel}>{menu.title}<i></i></button>
                        <div className="link-section dropdown-menu flex column">
                        {menu.linkInfo.map(newLink => (
                            <a href={newLink.href} className="dropdown-item">{newLink.text}</a>
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
            <input type="checkbox" ariaLabel="Theme toggle button" id="them-toggle" 
            onChange={() => siteTheme === './css/light.css' ? 
            setSiteTheme('./css/dark.css') : setSiteTheme('./css/light.css')}/>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.bundle.min.js"
            integrity="sha384-3ziFidFTgxJXHMDttyPJKDuTlmxJlwbSkojudK/CkRqKDOmeSbN6KLrGdrBQnT2n" crossorigin="anonymous"></script>
        </header>
    )
}

export default Header;