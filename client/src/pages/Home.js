import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="wrapper">
        <div className="banner">
          <div className="header">
            <h1 className="title">
              <br />
              <br />
              The NEW
              <br />
              commerce
              <br />
              platform
              <br />
              for broken
              <br />
              items
            </h1>
            <p className="subtitle">
              "One man's trash is another man's treasure."
            </p>
            <p className="subtitle">~Leonhard Culmans 1741</p>
            <br />
            <button className="btn-2">
              <Link to="/signup"  className="link-btn">Start Today</Link>
            </button>
          </div>
          <div className="profile"></div>
        </div>
      </section>
    </div>
    // <div>
    //   <section className="wrapper">
    //     <div className="banner">
    //     <div className="header">
    //         <h2 className="title">The NEW commerce platform for broken items</h2>
    //         <p className="subtitle">"One man's trash is another man's treasure."</p>
    //         <p className="subtitle">~Leonhard Culmans 1741</p>
    //         <Link to="/signup">Start Today</Link>
    //       </div>
    //       <div className="profile"></div>
    //     </div>
    //   </section>
    // </div>
  );
};

export default Home;
