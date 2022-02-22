import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import Auth from '../../utils/auth';

function Header(props) {
  //Grabs the categories
  var importedCategories = [];
  const { data } = useQuery(QUERY_CATEGORIES);
  const categoryData = data?.categories || [];

  //loop that appends category data to the imported categories array.
  categoryData.map((i) =>
    importedCategories.push({
      href: `/categories/${i.categoryName.toLowerCase().replace(/ /g, "-")}`,
      text: i.categoryName,
    })
  );

  //Toggles between light and dark themes
  const [siteTheme, setSiteTheme] = useState(
    localStorage.getItem("savedTheme") || "/css/dark.css"
  );

  //array the stores objects that are used to render the dropdown menus
  const dropdownMenus = [
    {
      title: "Sell",
      linkInfo: [
        { href: "selling-info", text: "Information" },
        { href: "add-product", text: "Add Product" },
      ],
      ariaLabel: "Open seller dropdown",
    },
    {
      title: "Buy",
      linkInfo: [
        { href: "buying-info", text: "Information" },
        { href: "marketplace", text: "Marketplace" },
      ],
      ariaLabel: "Open buyer dropdown",
    },
    {
      title: "Categories",
      linkInfo: [...importedCategories],
      ariaLabel: "Open category dropdown",
    }, 
  ];

  return (
    <header>
      <link rel="stylesheet" href={siteTheme} />
      <a href="/" id="home-link">
        <img src="/images/kintsugi_logo.png" alt="Go to Kintsugi home page" />
      </a>
      <nav id="sale-nav" className="navbar">
        {/* Creates a dropdown menu with it's links for all the objects in the dropdown array */}
        {dropdownMenus.map((menu) => (
          <span className="dropdown-block">
            <button
              className="link-dropdown nav-item"
              aria-label={menu.ariaLabel}
            >
              {menu.title}
              <i className="fa fa-angle-down"></i>
            </button>
            <div className="link-section dropdown-menu flex column">
              {menu.linkInfo.map((newLink) => (
                <a
                  href={newLink.href}
                  className="dropdown-item"
                  key={newLink.href}
                >
                  {newLink.text}
                </a>
              ))}
            </div>
          </span>
        ))}
      </nav>
      <nav id="login-info-nav" className="flex navbar">
        <a className="nav-item" href="about">
          About Us
        </a>
        {Auth.loggedIn() ? (
          <a 
          href="/" 
          onClick={Auth.logout} 
          className="link-btn nav-item">
            Logout
          </a>
        ) : (
          <a
          className="nav-item"
          href="login"
          id="login-link"
          className="link-btn nav-item"
        >
          Login
        </a>
        )}
        {/* Checkbox for toggling between light and dark themes */}
        <input
          className="nav-item"
          type="checkbox"
          aria-label="Theme toggle button"
          id="theme-toggle"
          onChange={() => {
            if (siteTheme === "/css/light.css") {
              setSiteTheme("/css/dark.css");
              localStorage.setItem("savedTheme", "/css/dark.css");
            } else {
              setSiteTheme("/css/light.css");
              localStorage.setItem("savedTheme", "/css/light.css");
            }
          }}
          checked={siteTheme === "/css/light.css" ? "checked" : ""}
        />
      </nav>
    </header>
  );
}

export default Header;
