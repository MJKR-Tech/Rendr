import React from 'react';
import '../App.css';
import { Button } from './Button';
import './FunctionSection.css';

function FunctionSection() {
  return (
    <div className='function-container'>
        <video src='/videos/video-3.mp4' autoPlay muted loop />
        <h1>RENDR</h1>
        <p>This place is for us to insert function description</p>
        <div className="function-btns">
            <Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'>File Upload</Button>
            <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'>Submit</Button>
        </div>
    </div>
  )
}

export default FunctionSection