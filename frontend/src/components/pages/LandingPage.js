import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <div className="alt-background">
        <div className="wrapper">
            <div className="outer-container">
                <div className="inline-component">
                  <div className="m-4">
                    <h1 className="welcome-message">Welcome to Rendr!</h1>
                    <p className="message" style={{margin:'10px 0px 0px 20px'}}>
                      Rendr is an automated financial report<br/>
                      rendering web application that converts<br/>
                      one or many JSON data files to form one<br/> 
                      formatted excel document.
                    </p>
                    <Link to="/app" className="blue-button">Click to Start Rendering</Link>
                  </div>
                  <img src="/images/front-page-image.png" className="front-page-image" alt="front-page"/>
                  
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default LandingPage;
