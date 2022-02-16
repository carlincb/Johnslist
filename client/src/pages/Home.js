import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <div>
        <div>
            <h2>The NEW commerce platform for broken items</h2>
            <p>"One man's trash is another man's treasure."</p>
            <p>~Leonhard Culmans 1741</p>
        </div>
        <div>
            <Link to="/signup">Start Today</Link>
        </div>
    </div>
  );
};

export default Home;