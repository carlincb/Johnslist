import React from 'react';

function Header(props) {

    const dropdownMenus = [
        {
            title: "Sell",
            linkInfo: [{href: "selling-info", }],
            ariaLabel: "Open sell dropdown"
        }
    ]

    return (
        <header>
            <a href="/" ariaLabel="Kintsugi home page" id="home-link"><img src="./images/kintsugi_logo.png" alt="Kintsugi home page"/></a>

            <nav id="sale-nav">
                <button className="link-dropdown"></button>
            </nav>
        </header>
    )
}