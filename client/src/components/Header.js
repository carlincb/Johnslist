import React from 'react';

function Header(props) {

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
       /* {
            title: "Categories",
            linkInfo: [...importedCategories],
            ariaLabel: "Open category dropdown"
        } */
    ]

    return (
        <header>
            <a href="/" id="home-link"><img src="./images/kintsugi_logo.png" alt="Go to Kintsugi home page"/></a>
            <nav id="sale-nav">
                {dropdownMenus.map(menu => {
                    <span class="dropdown-block">
                        <button className="link-dropdown" ariaLabel={menu.ariaLabel}>{menu.title}<i></i></button>
                        <div class="link-section">
                        {menu.linkInfo.map(newLink => {
                            <a href={newLink.href}>{newLink.text}</a>
                        })}
                        </div>
                    </span>
                })}
            </nav>
            
        </header>
    )
}