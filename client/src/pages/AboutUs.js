import React from 'react';
import './AboutUs.css';

function AboutUs(props) {
    return (
        <main id="about-main">
            <h1 id="about-header">ABOUT</h1>
            <article id="about-article">
                <p>Do you have stuff in your house that is broken but not quite junk?
                     Maybe it’s a swivel chair that’s missing a wheel, a piece of electronics with wiring that needs to be soldered or a shirt with a rip in it. 
                     We're sure you do! Or, are you someone who has the skills to fix things, but not necessarily the cash to buy the best of the best?
                </p>
                <p>Well, we have a place for you–<b>Kintsugi</b>! 
                    Our website incorporates the philosophy of Kintsugi the Japanese art of using gold to put pottery back together. 
                    With this in mind, we provide users with the option to buy and sell broken items that they may want to fix themselves and give a second life.
                </p>
                <p><b>Kintsugi</b> is a place where sellers of janky stuff meet with their discerning buyers. 
                    Delight in the secondhand splendors that are on offer, peruse the slightly tarnished wares, 
                    and revel in the world of “what could be” were just the right person to come upon it!
                </p>
                <p id="visit-p">~COME VISIT US TODAY!</p>
            </article>
        </main>
    )
}

export default AboutUs;