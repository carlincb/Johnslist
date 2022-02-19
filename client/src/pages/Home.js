import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="wrapper">
        <div className="banner">
          <div className="header">
            <h1 className="title">
              The NEW commerce
              <br />
              platform for
              <br />
              broken items
            </h1>
            <p className="subtitle">
              "One man's trash is another man's treasure."
            </p>
            <p className="subtitle">~Leonhard Culmans 1741</p>
            <Link to="/signup">Start Today</Link>
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
