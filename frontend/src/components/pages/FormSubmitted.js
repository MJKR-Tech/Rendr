import React from 'react'
import { Link } from 'react-router-dom';
import '../../App.css';

function FormSubmitted() {
    return (
        <>
            <div className="rendr-background">
                <div className="wrapper">
                    <div className="outer-container">
                        <div className="container">
                            <div className="callout">
                                <h2 className="message"> Form Submitted! </h2>
                                <h2 className="message"> Your file should start downloading in a few seconds. </h2>
                                <Link className="reload-link" to="/app">Click here to render another report</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormSubmitted;